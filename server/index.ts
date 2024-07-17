import app from "./app";
import { connectDB } from "./db";

connectDB();
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);