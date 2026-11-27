import { Router, type Router as ExpressRouter } from "express";
import { PlanningService } from "../services/PlanningService.ts";
import { PlanningBuilder } from "../domain/planning/PlanningBuilder.ts";

export function createPlanningRouter(
  service: PlanningService = new PlanningService(),
): ExpressRouter {
  const router = Router();

  // GET /plannings
  router.get("/", async (_req, res, next) => {
    try {
      const plannings = await service.findAll();
      res.status(200).json(plannings);
    } catch (error) {
      next(error);
    }
  });

  // GET /plannings/:id
  router.get("/:id", async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          error: "El ID debe ser un número entero positivo",
        });
        return;
      }

      const planning = await service.findById(id);

      if (!planning) {
        res.status(404).json({
          error: "No se encontró la planificación",
        });
        return;
      }

      res.status(200).json(planning);
    } catch (error) {
      next(error);
    }
  });

  // POST /plannings
  router.post("/", async (req, res, next) => {
    try {
      const {
        title,
        description,
        category,
        location,
        targetDate,
        estimatedBudget,
      } = req.body;

      const planning = new PlanningBuilder()
        .setTitle(title)
        .setDescription(description)
        .setCategory(category)
        .setLocation(location)
        .setTargetDate(new Date(targetDate))
        .setEstimatedBudget(estimatedBudget)
        .build();

      const created = await service.create(planning);

      res.status(201).json(created);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }

      next(error);
    }
  });

  return router;
}
