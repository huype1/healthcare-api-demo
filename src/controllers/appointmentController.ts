import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import Appointment from '../models/Appointment';
import Patient from '../models/Patient';
import User from '../models/User';
import Facility from '../models/Facility';

export const getAppointments = asyncHandler(async (req: Request, res: Response) => {
  const {
    patient,
    doctor,
    facility,
    status,
    type,
    startDate,
    endDate,
    page = 1,
    limit = 10
  } = req.query;

  const filter: any = {};

  if (patient) filter.patient = patient;
  if (doctor) filter.doctor = doctor;
  if (facility) filter.facility = facility;
  if (status) filter.status = status;
  if (type) filter.type = type;

  // Date range filter
  if (startDate || endDate) {
    filter.scheduledDate = {};
    if (startDate) filter.scheduledDate.$gte = new Date(startDate as string);
    if (endDate) filter.scheduledDate.$lte = new Date(endDate as string);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const appointments = await Appointment.find(filter)
    .populate('patient', 'firstName lastName email phone')
    .populate('doctor', 'fullName email role')
    .populate('facility', 'name address')
    .sort({ scheduledDate: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Appointment.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: appointments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
});

// Get single appointment by ID
export const getAppointment = asyncHandler(async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient', 'firstName lastName email phone dob gender')
    .populate('doctor', 'fullName email role phone')
    .populate('facility', 'name address phone');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// Create new appointment
export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
  const {
    patient,
    doctor,
    facility,
    scheduledDate,
    duration = 30,
    type = 'consultation',
    notes
  } = req.body;

  // Validate that patient, doctor, and facility exist
  const [patientExists, doctorExists, facilityExists] = await Promise.all([
    Patient.findById(patient),
    User.findById(doctor),
    Facility.findById(facility)
  ]);

  if (!patientExists) {
    return res.status(400).json({
      success: false,
      message: 'Patient not found'
    });
  }

  if (!doctorExists) {
    return res.status(400).json({
      success: false,
      message: 'Doctor not found'
    });
  }

  if (!facilityExists) {
    return res.status(400).json({
      success: false,
      message: 'Facility not found'
    });
  }

  const appointmentDate = new Date(scheduledDate);
  const endTime = new Date(appointmentDate.getTime() + duration * 60000);

  const conflictingAppointment = await Appointment.findOne({
    doctor,
    status: { $in: ['scheduled', 'confirmed'] },
    $or: [
      {
        scheduledDate: { $lt: endTime },
        $expr: {
          $gte: {
            $add: ['$scheduledDate', { $multiply: ['$duration', 60000] }]
          },
          appointmentDate
        }
      }
    ]
  });

  if (conflictingAppointment) {
    return res.status(400).json({
      success: false,
      message: 'Doctor is not available at the scheduled time'
    });
  }

  const appointment = await Appointment.create({
    patient,
    doctor,
    facility,
    scheduledDate: appointmentDate,
    duration,
    type,
    notes,
    status: 'scheduled'
  });

  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'firstName lastName email phone')
    .populate('doctor', 'fullName email role')
    .populate('facility', 'name address');

  res.status(201).json({
    success: true,
    data: populatedAppointment
  });
});

// Update appointment
export const updateAppointment = asyncHandler(async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  // If updating scheduled date or doctor, check availability
  if ((req.body.scheduledDate || req.body.doctor) && appointment.status !== 'cancelled') {
    const newDate = req.body.scheduledDate ? new Date(req.body.scheduledDate) : appointment.scheduledDate;
    const newDoctor = req.body.doctor || appointment.doctor;
    const newDuration = req.body.duration || appointment.duration;
    const endTime = new Date(newDate.getTime() + newDuration * 60000);

    const conflictingAppointment = await Appointment.findOne({
      _id: { $ne: appointment._id },
      doctor: newDoctor,
      status: { $in: ['scheduled', 'confirmed'] },
      $or: [
        {
          scheduledDate: { $lt: endTime },
          $expr: {
            $gte: {
              $add: ['$scheduledDate', { $multiply: ['$duration', 60000] }]
            },
            newDate
          }
        }
      ]
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available at the scheduled time'
      });
    }
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('patient', 'firstName lastName email phone')
   .populate('doctor', 'fullName email role')
   .populate('facility', 'name address');

  res.status(200).json({
    success: true,
    data: updatedAppointment
  });
});

export const deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  // Only allow deletion of scheduled appointments
  if (appointment.status !== 'scheduled') {
    return res.status(400).json({
      success: false,
      message: 'Can only delete scheduled appointments'
    });
  }

  await Appointment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Appointment deleted successfully'
  });
});

// Check doctor availability
export const checkDoctorAvailability = asyncHandler(async (req: Request, res: Response) => {
  const { doctor, date, duration = 30 } = req.query;

  if (!doctor || !date) {
    return res.status(400).json({
      success: false,
      message: 'Doctor ID and date are required'
    });
  }

  const startDate = new Date(date as string);
  const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // Next day

  const appointments = await Appointment.find({
    doctor,
    scheduledDate: { $gte: startDate, $lt: endDate },
    status: { $in: ['scheduled', 'confirmed'] }
  }).sort({ scheduledDate: 1 });

  // Generate available time slots
  const availableSlots: { startTime: Date; endTime: Date; duration: number }[] = [];
  const workStart = 9; // 9 AM
  const workEnd = 17; // 5 PM
  const slotDuration = Number(duration);

  for (let hour = workStart; hour < workEnd; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const slotStart = new Date(startDate);
      slotStart.setHours(hour, minute, 0, 0);
      
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
      
      const isAvailable = !appointments.some(appointment => {
        const appointmentEnd = new Date(appointment.scheduledDate.getTime() + appointment.duration * 60000);
        return slotStart < appointmentEnd && slotEnd > appointment.scheduledDate;
      });

      if (isAvailable) {
        availableSlots.push({
          startTime: slotStart,
          endTime: slotEnd,
          duration: slotDuration
        });
      }
    }
  }

  res.status(200).json({
    success: true,
    data: {
      doctor,
      date: startDate,
      availableSlots,
      totalSlots: availableSlots.length
    }
  });
});

// Get appointments by patient
export const getPatientAppointments = asyncHandler(async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const { status, page = 1, limit = 10 } = req.query;

  const filter: any = { patient: patientId };
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const appointments = await Appointment.find(filter)
    .populate('doctor', 'fullName email role')
    .populate('facility', 'name address')
    .sort({ scheduledDate: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Appointment.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: appointments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
});

export const getDoctorAppointments = asyncHandler(async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const { status, date, page = 1, limit = 10 } = req.query;

  const filter: any = { doctor: doctorId };
  if (status) filter.status = status;
  if (date) {
    const startDate = new Date(date as string);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    filter.scheduledDate = { $gte: startDate, $lt: endDate };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const appointments = await Appointment.find(filter)
    .populate('patient', 'firstName lastName email phone')
    .populate('facility', 'name address')
    .sort({ scheduledDate: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Appointment.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: appointments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
});
