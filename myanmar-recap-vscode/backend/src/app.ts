import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Myanmar Recap API is running." });
});

app.use("/api/projects", projectRoutes);

export default app;
