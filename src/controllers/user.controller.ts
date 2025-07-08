import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { sendSuccess, sendError } from '../utils/httpResponse';

export const getAllUsers = async (_: Request, res: Response) => {
	try {
		const users = await userService.getAllUsers();
		return sendSuccess(res, users);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await userService.getUserById(+req.params.id);
		return sendSuccess(res, user);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const updated = await userService.updateUser(+req.params.id, req.body);
		return sendSuccess(res, updated);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		await userService.deleteUser(+req.params.id);
		return sendSuccess(res, null, 204);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};
