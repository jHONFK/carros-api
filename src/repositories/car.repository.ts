import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const createCar = (data: Prisma.CarCreateInput) =>
	prisma.car.create({ data });

export const findCarsByUser = (userId: number) =>
	prisma.car.findMany({ where: { userId } });

export const findCarById = (id: number) =>
	prisma.car.findUnique({ where: { id } });

export const updateCar = (id: number, data: Prisma.CarUpdateInput) =>
	prisma.car.update({ where: { id }, data });

export const deleteCar = (id: number) =>
	prisma.car.delete({ where: { id } });
