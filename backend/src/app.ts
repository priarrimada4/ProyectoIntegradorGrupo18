import express, { type Express } from "express";
import { createPlanningRouter } from "./routes/PlanningRoute.ts";

const app: Express = express();

app.use(express.json());
app.use("/plannings", createPlanningRouter());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "¡Bienvenido a Tyta!",
    descripcion: "Tranqui, yo te aviso.",
  });
});

export default app;
