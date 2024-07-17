import mongoose from 'mongoose';
import { z } from 'zod';

// Esquema de Mongoose
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;

// Esquema de Zod
export const zodProductSchema = z.object({
    name: z.string().min(1).max(255).optional(), // Ajusta los límites según tus necesidades
    description: z.string().min(1).max(1000).optional(),
    stock: z.number().min(0).optional(),
    image: z.string().url().optional(),
    price: z.number().min(0).optional(),
  });


export type ProductType = z.infer<typeof zodProductSchema>;
