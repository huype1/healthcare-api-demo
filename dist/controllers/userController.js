import { body, param } from 'express-validator';
import User from '../models/User';
import asyncHandler from '../middleware/asyncHandler';
export const validateCreateUser = [
    body('fullName').isString().trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('role').isIn(['doctor', 'nurse']),
];
export const validateUpdateUser = [
    body('fullName').optional().isString().trim().notEmpty(),
    body('email').optional().isEmail().normalizeEmail(),
    body('role').optional().isIn(['doctor', 'nurse']),
];
export const validateUserId = [param('id').isMongoId()];
export const listUsers = asyncHandler(async (_req, res) => {
    const users = await User.find();
    res.json(users.map(user => ({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        facility: user.facility,
    })));
});
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
export const createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
});
export const getReportsUserByTime = asyncHandler(async (req, res) => {
    const { from, to, format } = req.query;
    if (!from || !to || !format) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const users = await User.find({
        createdAt: {
            $gte: new Date(from),
            $lte: new Date(to),
        },
    });
    return res.json(users.map(user => ({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        facility: user.facility,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })));
});
//# sourceMappingURL=userController.js.map