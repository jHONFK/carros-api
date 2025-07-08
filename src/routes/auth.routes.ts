import { Router } from 'express';
import { registerController, loginController } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
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

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController);

export default router;
