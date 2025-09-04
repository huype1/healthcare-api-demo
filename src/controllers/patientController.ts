import type { Request, Response } from 'express';
import { body, param } from 'express-validator';
import Patient from '../models/Patient';
import asyncHandler from '../middleware/asyncHandler';

export const validateCreatePatient = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  body('birthDate').optional().isDate(),
  body('phone').optional().isString().trim().notEmpty(),
  body('facility').optional().isMongoId(),
  body('primaryDoctor').optional().isMongoId(),
];

export const validateUpdatePatient = [
  body('firstName').optional().isString().trim().notEmpty(),
  body('lastName').optional().isString().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  body('birthDate').optional().isDate(),
  body('phone').optional().isString().trim().notEmpty(),
  body('facility').optional().isMongoId(),
  body('primaryDoctor').optional().isMongoId(),
];

export const validatePatientId = [param('id').isMongoId()];

export const listPatients = asyncHandler(async (_req: Request, res: Response) => {
  const patients = await Patient.find();
  res.json(patients);
});

export const getPatient = asyncHandler(async (req: Request, res: Response) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

export const createPatient = asyncHandler(async (req: Request, res: Response) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
});

export const updatePatient = asyncHandler(async (req: Request, res: Response) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

export const deletePatient = asyncHandler(async (req: Request, res: Response) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.status(204).send();
});


