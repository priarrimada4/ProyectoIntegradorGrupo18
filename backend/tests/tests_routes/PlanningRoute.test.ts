import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { createPlanningRouter } from "../../src/routes/PlanningRoute.ts";
import type { PlanningService } from "../../src/services/PlanningService.ts";

describe("PlanningRoutes", () => {
  const serviceMock = {
    findAll: vi.fn(),
    findById: vi.fn(),
  };

  const app = express();

  app.use(express.json());
  app.use(
    "/plannings",
    createPlanningRouter(serviceMock as unknown as PlanningService),
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /plannings", () => {
    it("debería devolver todas las planificaciones", async () => {
      serviceMock.findAll.mockResolvedValue([
        {
          id: 1,
          title: "Preparar Working Holiday",
          description: "Organizar el viaje",
          category: "travel",
          location: "Nueva Zelanda",
          targetDate: new Date("2027-01-15"),
          estimatedBudget: 6000,
        },
      ]);

      const response = await request(app).get("/plannings");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe("Preparar Working Holiday");
      expect(serviceMock.findAll).toHaveBeenCalledOnce();
    });

    it("debería devolver un array vacío cuando no hay planificaciones", async () => {
      serviceMock.findAll.mockResolvedValue([]);

      const response = await request(app).get("/plannings");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /plannings/:id", () => {
    it("debería devolver una planificación existente", async () => {
      serviceMock.findById.mockResolvedValue({
        id: 1,
        title: "Preparar Working Holiday",
        description: "Organizar el viaje",
        category: "travel",
        location: "Nueva Zelanda",
        targetDate: new Date("2027-01-15"),
        estimatedBudget: 6000,
      });

      const response = await request(app).get("/plannings/1");

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.title).toBe("Preparar Working Holiday");
      expect(serviceMock.findById).toHaveBeenCalledWith(1);
    });

    it("debería devolver 404 si la planificación no existe", async () => {
      serviceMock.findById.mockResolvedValue(undefined);

      const response = await request(app).get("/plannings/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("No se encontró la planificación");
    });

    it("debería devolver 400 si el ID no es válido", async () => {
      const response = await request(app).get("/plannings/abc");

      expect(response.status).toBe(400);
      expect(serviceMock.findById).not.toHaveBeenCalled();
    });
  });
});
