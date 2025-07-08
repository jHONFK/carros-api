import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const auth = req.headers.authorization;
	if (!auth?.startsWith('Bearer ')) {
		return res.status(401).json({ status: 'error', message: 'Token faltando' });
	}
	const token = auth.split(' ')[1];
	try {
		const payload: any = jwt.verify(token, JWT_SECRET);
		(req as any).user = { id: payload.sub, role: payload.role };
		next();
	} catch {
		return res.status(401).json({ status: 'error', message: 'Token inválido' });
	}
};
