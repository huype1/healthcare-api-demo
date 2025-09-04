import { Router } from 'express';
import validate from '../middleware/validate';
import {
  listFacilityGroups,
  getFacilityGroup,
  createFacilityGroup,
  updateFacilityGroup,
  deleteFacilityGroup,
  validateCreateFacilityGroup,
  validateUpdateFacilityGroup,
  validateFacilityGroupId,
} from '../controllers/facilityGroupController';

const router = Router();

router.get('/', listFacilityGroups);
router.get('/:id', validateFacilityGroupId, validate, getFacilityGroup);
router.post('/', validateCreateFacilityGroup, validate, createFacilityGroup);
router.put('/:id', validateFacilityGroupId, validateUpdateFacilityGroup, validate, updateFacilityGroup);
router.delete('/:id', validateFacilityGroupId, validate, deleteFacilityGroup);

export default router;


