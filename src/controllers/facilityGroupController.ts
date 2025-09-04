import type { Request, Response } from 'express';
import { body, param } from 'express-validator';
import FacilityGroup from '../models/FacilityGroup';
import asyncHandler from '../middleware/asyncHandler';

export const validateCreateFacilityGroup = [
  body('name').isString().trim().notEmpty(),
];

export const validateUpdateFacilityGroup = [
  body('name').optional().isString().trim().notEmpty(),
];

export const validateFacilityGroupId = [param('id').isMongoId()];

export const listFacilityGroups = asyncHandler(async (_req: Request, res: Response) => {
  const groups = await FacilityGroup.find();
  res.json(groups);
});

export const getFacilityGroup = asyncHandler(async (req: Request, res: Response) => {
  const group = await FacilityGroup.findById(req.params.id);
  if (!group) return res.status(404).json({ error: 'FacilityGroup not found' });
  res.json(group);
});

export const createFacilityGroup = asyncHandler(async (req: Request, res: Response) => {
  const group = await FacilityGroup.create(req.body);
  res.status(201).json(group);
});

export const updateFacilityGroup = asyncHandler(async (req: Request, res: Response) => {
  const group = await FacilityGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!group) return res.status(404).json({ error: 'FacilityGroup not found' });
  res.json(group);
});

export const deleteFacilityGroup = asyncHandler(async (req: Request, res: Response) => {
  const group = await FacilityGroup.findByIdAndDelete(req.params.id);
  if (!group) return res.status(404).json({ error: 'FacilityGroup not found' });
  res.status(204).send();
});


