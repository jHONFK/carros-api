import express from 'express';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import carRoutes from './routes/car.routes';

const app = express();

app.use(express.json());
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/cars', carRoutes);

// rota default
app.use((_, res) =>
	res.status(404).json({ status: 'error', message: 'Rota não encontrada' })
);

export default app;
