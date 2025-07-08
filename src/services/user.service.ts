import * as userRepo from '../repositories/user.repository';
import { UpdateUserInput } from '../schemas/user.schema';

export const getAllUsers = () => userRepo.findAllUsers();
export const getUserById = (id: number) => userRepo.findUserById(id);
export const updateUser = (id: number, data: UpdateUserInput) =>
	userRepo.updateUser(id, data);
export const deleteUser = (id: number) => userRepo.deleteUser(id);
