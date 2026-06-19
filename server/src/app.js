import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv/config";
import { certificate } from "./routes/certificate.route.js";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("<h1>Api ini berfungsi</h1>");
});

app.use("/api", certificate);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
