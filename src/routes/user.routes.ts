import { Router } from 'express';
import {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ensureRole } from '../middlewares/role.middleware';
import { updateUserSchema } from '../schemas/user.schema';
import { ZodError } from 'zod';

const router = Router();

const validate =
	(schema: any) =>
		(req: any, res: any, next: any) => {
			try {
				req.body = schema.parse(req.body);
				next();
			} catch (err) {
				if (err instanceof ZodError) {
					return res.status(400).json({ status: 'error', errors: err.errors });
				}
				next(err);
			}
		};

router.use(authMiddleware, ensureRole('ADMIN'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
