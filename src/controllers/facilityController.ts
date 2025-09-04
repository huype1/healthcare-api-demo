import type { Request, Response } from 'express';
import { body, param } from 'express-validator';
import Facility from '../models/Facility';
import asyncHandler from '../middleware/asyncHandler';

export const validateCreateFacility = [
  body('name').isString().trim().notEmpty(),
  body('group').optional().isMongoId(),
];

export const validateUpdateFacility = [
  body('name').optional().isString().trim().notEmpty(),
  body('group').optional().isMongoId(),
];

export const validateFacilityId = [param('id').isMongoId()];

export const listFacilities = asyncHandler(async (_req: Request, res: Response) => {
  const facilities = await Facility.find().populate('group');
  res.json(facilities);
});

export const getFacility = asyncHandler(async (req: Request, res: Response) => {
  const facility = await Facility.findById(req.params.id).populate('group');
  if (!facility) return res.status(404).json({ error: 'Facility not found' });
  res.json(facility);
});

export const createFacility = asyncHandler(async (req: Request, res: Response) => {
  const facility = await Facility.create(req.body);
  res.status(201).json(facility);
});

export const updateFacility = asyncHandler(async (req: Request, res: Response) => {
  const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!facility) return res.status(404).json({ error: 'Facility not found' });
  res.json(facility);
});

export const deleteFacility = asyncHandler(async (req: Request, res: Response) => {
  const facility = await Facility.findByIdAndDelete(req.params.id);
  if (!facility) return res.status(404).json({ error: 'Facility not found' });
  res.status(204).send();
});


