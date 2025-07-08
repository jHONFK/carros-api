import { Request, Response } from 'express';
import { register, login } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/httpResponse';

export const registerController = async (req: Request, res: Response) => {
	try {
		const user = await register(req.body);
		return sendSuccess(res, user, 201);
	} catch (err: any) {
		return sendError(res, err.message, err.status || 400);
	}
};

export const loginController = async (req: Request, res: Response) => {
	try {
		const token = await login(req.body);
		return sendSuccess(res, { token });
	} catch (err: any) {
		return sendError(res, err.message, err.status || 400);
	}
};
