import { z } from 'zod';

export const createCarSchema = z.object({
	brand: z.string().min(1),
	model: z.string().min(1),
	year: z.number().int().min(1886), // primeiro carro, ajuste se quiser
});
export type CarCreateInput = z.infer<typeof createCarSchema>;

export const updateCarSchema = createCarSchema.partial();
export type CarUpdateInput = z.infer<typeof updateCarSchema>;
