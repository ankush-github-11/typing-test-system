import express from "express";
import cors from "cors";
import typingRoutes from "./routes/typingRoutes";
import { pool } from "./config/db"
import tokenRoutes from "./routes/tokenRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/typing", typingRoutes);
app.use("/api/tokens", tokenRoutes);

const PORT = 5000;

pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected");
        app.listen(5000, () => {
            console.log(
                "Server running on port 5000"
            );
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });