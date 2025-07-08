import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/user.repository';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const register = async (data: RegisterInput) => {
	const exists = await userRepo.findUserByEmail(data.email);
	if (exists) {
		const err: any = new Error('Email já cadastrado');
		err.status = 409;
		throw err;
	}
	const hashed = await bcrypt.hash(data.password, 10);
	return userRepo.createUser({ ...data, password: hashed });
};

export const login = async (data: LoginInput) => {
	const user = await userRepo.findUserByEmail(data.email);
	if (!user) {
		const err: any = new Error('Credenciais inválidas');
		err.status = 401;
		throw err;
	}
	const match = await bcrypt.compare(data.password, user.password);
	if (!match) {
		const err: any = new Error('Credenciais inválidas');
		err.status = 401;
		throw err;
	}
	const token = jwt.sign(
		{ sub: user.id, role: user.role },
		JWT_SECRET,
		{ expiresIn: '1h' }
	);
	return token;
};
