# Appointment System Documentation

## Overview

The appointment system integrates with your existing healthcare API to manage appointments between patients and healthcare providers (doctors/nurses) at specific facilities.

## Database Relationships

### Current Relationships
- **Patient** → **Facility** (belongs to a facility)
- **Patient** → **User** (has a primary doctor)
- **User** → **Facility** (doctors/nurses work at a facility)
- **Facility** → **FacilityGroup** (facilities belong to groups)

### New Appointment Relationships
- **Appointment** → **Patient** (who the appointment is for)
- **Appointment** → **User** (doctor/nurse providing care)
- **Appointment** → **Facility** (where the appointment takes place)

## Why MongoDB is Perfect for This Use Case

1. **Schema Flexibility**: Healthcare requirements change frequently, and MongoDB's flexible schema allows easy modifications
2. **Document-Based**: Appointments can have complex nested data (symptoms, notes, prescriptions)
3. **Existing Infrastructure**: Your current setup is already MongoDB-based
4. **Scalability**: Handles large datasets and complex queries efficiently
5. **JSON-like Structure**: Natural fit for healthcare data representation

## Appointment Model Schema

```typescript
interface AppointmentDocument {
  patient: ObjectId;           // Reference to Patient
  doctor: ObjectId;            // Reference to User (doctor/nurse)
  facility: ObjectId;          // Reference to Facility
  scheduledDate: Date;         // When the appointment is scheduled
  duration: number;            // Duration in minutes (15-480)
  type: AppointmentType;       // consultation, follow-up, emergency, etc.
  status: AppointmentStatus;   // scheduled, confirmed, completed, etc.
  notes?: string;              // General notes
  symptoms?: string[];         // Patient symptoms
  diagnosis?: string;          // Doctor's diagnosis
  prescription?: string;       // Prescribed medications/treatments
  followUpDate?: Date;         // Next follow-up appointment
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Main Appointment Routes

#### GET /api/appointments
Get all appointments with optional filters:
- `patient` - Filter by patient ID
- `doctor` - Filter by doctor ID
- `facility` - Filter by facility ID
- `status` - Filter by appointment status
- `type` - Filter by appointment type
- `startDate` - Filter appointments from this date
- `endDate` - Filter appointments until this date
- `page` - Page number for pagination
- `limit` - Number of results per page

#### POST /api/appointments
Create a new appointment:
```json
{
  "patient": "patient_id",
  "doctor": "doctor_id",
  "facility": "facility_id",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "duration": 30,
  "type": "consultation",
  "notes": "Regular checkup"
}
```

#### GET /api/appointments/:id
Get a specific appointment by ID

#### PUT /api/appointments/:id
Update an existing appointment

#### DELETE /api/appointments/:id
Delete an appointment (only if status is 'scheduled')

### Specialized Routes

#### GET /api/appointments/availability/doctor
Check doctor availability for a specific date:
- `doctor` - Doctor ID
- `date` - Date to check (YYYY-MM-DD)
- `duration` - Appointment duration in minutes (default: 30)

#### GET /api/appointments/patient/:patientId
Get all appointments for a specific patient

#### GET /api/appointments/doctor/:doctorId
Get all appointments for a specific doctor

## Business Logic Features

### 1. Conflict Detection
- Automatically checks for scheduling conflicts when creating/updating appointments
- Prevents double-booking of doctors
- Validates appointment duration overlaps

### 2. Availability Checking
- Generates available time slots for doctors
- Considers existing appointments and work hours
- Configurable slot duration

### 3. Status Management
- **scheduled**: Initial appointment creation
- **confirmed**: Patient has confirmed attendance
- **in-progress**: Appointment is currently happening
- **completed**: Appointment finished successfully
- **cancelled**: Appointment was cancelled
- **no-show**: Patient didn't show up

### 4. Appointment Types
- **consultation**: General medical consultation
- **follow-up**: Follow-up appointment
- **emergency**: Emergency visit
- **routine**: Routine checkup
- **specialist**: Specialist consultation

## Usage Examples

### Creating an Appointment
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient": "507f1f77bcf86cd799439011",
    "doctor": "507f1f77bcf86cd799439012",
    "facility": "507f1f77bcf86cd799439013",
    "scheduledDate": "2024-01-15T10:00:00Z",
    "duration": 30,
    "type": "consultation",
    "notes": "Annual physical examination"
  }'
```

### Checking Doctor Availability
```bash
curl "http://localhost:3000/api/appointments/availability/doctor?doctor=507f1f77bcf86cd799439012&date=2024-01-15&duration=30"
```

### Getting Patient Appointments
```bash
curl "http://localhost:3000/api/appointments/patient/507f1f77bcf86cd799439011?status=scheduled"
```

## Database Indexes

The appointment system includes optimized indexes for efficient querying:
- `{ patient: 1, scheduledDate: -1 }` - Patient appointments sorted by date
- `{ doctor: 1, scheduledDate: -1 }` - Doctor appointments sorted by date
- `{ facility: 1, scheduledDate: -1 }` - Facility appointments sorted by date
- `{ status: 1, scheduledDate: -1 }` - Appointments by status
- `{ scheduledDate: 1 }` - Date range queries
- `{ doctor: 1, scheduledDate: 1, status: 1 }` - Availability checking

## Future Enhancements

1. **Email Notifications**: Send reminders to patients and doctors
2. **Calendar Integration**: Sync with external calendar systems
3. **Recurring Appointments**: Support for series of appointments
4. **Waitlist Management**: Handle appointment cancellations and waitlists
5. **Telemedicine Support**: Add video call integration
6. **Insurance Integration**: Link appointments with insurance claims

## Migration Considerations

Since you're already using MongoDB, no database migration is needed. The appointment system integrates seamlessly with your existing models and follows the same patterns.

The system is designed to be scalable and can handle:
- Multiple facilities
- Different appointment types
- Complex scheduling rules
- High-volume appointment booking
