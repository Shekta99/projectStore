import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

import productRoutes from "./routes/products.routes"; 
import { corsOptions } from "./config";

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 

app.use((req, res, next) => {
  const error = new Error("Not found");
    res.status(404).json([
        {
        message: error.message,
        },
    ]);
});

// error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(error.status || 500).json([
        {
            message: error.message,
        },
    ]);
});

export default app;