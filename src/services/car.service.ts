import * as carRepo from '../repositories/car.repository';
import { CarCreateInput, CarUpdateInput } from '../schemas/car.schema';

export const createCar = (data: CarCreateInput & { userId: number }) =>
	carRepo.createCar({
		brand: data.brand,
		model: data.model,
		year: data.year,
		user: { connect: { id: data.userId } },
	});

export const getCarsByUser = (userId: number) =>
	carRepo.findCarsByUser(userId);

export const getCarById = async (id: number, userId: number) => {
	const car = await carRepo.findCarById(id);
	if (!car || car.userId !== userId) {
		const err: any = new Error('Carro não encontrado');
		err.status = 404;
		throw err;
	}
	return car;
};

export const updateCar = async (
	id: number,
	userId: number,
	data: CarUpdateInput
) => {
	const car = await getCarById(id, userId);
	return carRepo.updateCar(id, data);
};

export const deleteCar = async (id: number, userId: number) => {
	await getCarById(id, userId);
	return carRepo.deleteCar(id);
};
