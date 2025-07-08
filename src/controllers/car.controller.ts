import { Request, Response } from 'express';
import * as carService from '../services/car.service';
import { sendSuccess, sendError } from '../utils/httpResponse';

export const createCar = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		const car = await carService.createCar({ ...req.body, userId });
		return sendSuccess(res, car, 201);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const getMyCars = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		const cars = await carService.getCarsByUser(userId);
		return sendSuccess(res, cars);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const getCarById = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		const car = await carService.getCarById(+req.params.id, userId);
		return sendSuccess(res, car);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const updateCar = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		const car = await carService.updateCar(+req.params.id, userId, req.body);
		return sendSuccess(res, car);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};

export const deleteCar = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		await carService.deleteCar(+req.params.id, userId);
		return sendSuccess(res, null, 204);
	} catch (err: any) {
		return sendError(res, err.message);
	}
};
