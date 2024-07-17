import { Request, Response } from 'express';
import Product from '../models/product.model';
import { ProductType } from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: ProductType = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error :any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData: Partial<ProductType> = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
