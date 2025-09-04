import { Router } from 'express';
import validate from '../middleware/validate';
import { listFacilities, getFacility, createFacility, updateFacility, deleteFacility, validateCreateFacility, validateUpdateFacility, validateFacilityId, } from '../controllers/facilityController';
const router = Router();
router.get('/', listFacilities);
router.get('/:id', validateFacilityId, validate, getFacility);
router.post('/', validateCreateFacility, validate, createFacility);
router.put('/:id', validateFacilityId, validateUpdateFacility, validate, updateFacility);
router.delete('/:id', validateFacilityId, validate, deleteFacility);
export default router;
//# sourceMappingURL=facilities.js.map