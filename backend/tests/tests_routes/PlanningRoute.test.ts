import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { createPlanningRouter } from "../../src/routes/PlanningRoute.ts";
import type { PlanningService } from "../../src/services/PlanningService.ts";

describe("PlanningRoutes", () => {
  const serviceMock = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
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

  describe("POST /plannings", () => {
    const planningData = {
      title: "Preparar Working Holiday",
      description: "Organizar el viaje a Nueva Zelanda",
      category: "travel",
      location: "Nueva Zelanda",
      targetDate: "2027-01-15",
      estimatedBudget: 6000,
    };

    it("debería crear una planificación correctamente", async () => {
      serviceMock.create.mockResolvedValue({
        id: 1,
        ...planningData,
        targetDate: new Date(planningData.targetDate),
      });

      const response = await request(app).post("/plannings").send(planningData);

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.title).toBe(planningData.title);
      expect(serviceMock.create).toHaveBeenCalledOnce();
    });

    it("debería devolver 400 si faltan datos obligatorios", async () => {
      const response = await request(app).post("/plannings").send({
        title: "Preparar Working Holiday",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Faltan datos obligatorios para crear la planificación",
      );
      expect(serviceMock.create).not.toHaveBeenCalled();
    });

    it("debería devolver 400 si la fecha es inválida", async () => {
      const response = await request(app)
        .post("/plannings")
        .send({
          ...planningData,
          targetDate: "fecha incorrecta",
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "La fecha de la planificación no es válida",
      );
      expect(serviceMock.create).not.toHaveBeenCalled();
    });

    it("debería permitir crear una planificación sin presupuesto", async () => {
      const { estimatedBudget, ...dataWithoutBudget } = planningData;

      serviceMock.create.mockImplementation(async (planning) => ({
        id: 2,
        ...planning,
      }));

      const response = await request(app)
        .post("/plannings")
        .send(dataWithoutBudget);

      expect(response.status).toBe(201);
      expect(response.body.estimatedBudget).toBeUndefined();
    });
  });
});
