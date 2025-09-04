import { Router } from 'express';
import validate from '../middleware/validate';
import { listUsers, getUser, createUser, updateUser, deleteUser, validateCreateUser, validateUpdateUser, validateUserId, getReportsUserByTime, } from '../controllers/userController';
const router = Router();
router.get('/', listUsers);
router.get('/:id', validateUserId, validate, getUser);
router.post('/', validateCreateUser, validate, createUser);
router.put('/:id', validateUserId, validateUpdateUser, validate, updateUser);
router.delete('/:id', validateUserId, validate, deleteUser);
router.get('/report', getReportsUserByTime);
export default router;
//# sourceMappingURL=users.js.map