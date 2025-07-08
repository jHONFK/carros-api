import { Router } from 'express';
import {
	createCar,
	getMyCars,
	getCarById,
	updateCar,
	deleteCar,
} from '../controllers/car.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createCarSchema, updateCarSchema } from '../schemas/car.schema';
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

router.use(authMiddleware);

router.post('/', validate(createCarSchema), createCar);
router.get('/', getMyCars);
router.get('/:id', getCarById);
router.patch('/:id', validate(updateCarSchema), updateCar);
router.delete('/:id', deleteCar);

export default router;
