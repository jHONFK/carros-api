import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = (data: Prisma.UserCreateInput) =>
	prisma.user.create({ data });

export const findUserByEmail = (email: string) =>
	prisma.user.findUnique({ where: { email } });

export const findUserById = (id: number) =>
	prisma.user.findUnique({ where: { id } });

export const findAllUsers = () =>
	prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });

export const updateUser = (id: number, data: Prisma.UserUpdateInput) =>
	prisma.user.update({ where: { id }, data });

export const deleteUser = (id: number) =>
	prisma.user.delete({ where: { id } });
