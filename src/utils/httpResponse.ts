import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, status = 200) =>
	res.status(status).json({ status: 'success', data });

export const sendError = (res: Response, message: string, status = 400) =>
	res.status(status).json({ status: 'error', message });
