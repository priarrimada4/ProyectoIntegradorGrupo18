import { describe, it, expect, beforeEach, vi } from "vitest";
import { PlanningService } from "../../src/services/PlanningService.ts";
import { Planning } from "../../src/domain/planning/Planning.ts";
import type { PlanningPersistido } from "../../src/repositories/PlanningRepository.ts";
import type { PlanningRepository } from "../../src/repositories/PlanningRepository.ts";

describe("PlanningService", () => {
  const planning = new Planning(
    "Preparar Working Holiday",
    "Organizar el viaje a Nueva Zelanda",
    "travel",
    "Nueva Zelanda",
    new Date("2027-01-15"),
    6000,
  );

  const planningPersistido: PlanningPersistido = {
    ...planning,
    id: 1,
  };

  const repositoryMock = {
    create: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  let service: PlanningService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new PlanningService(
      repositoryMock as unknown as PlanningRepository,
    );
  });

  describe("create", () => {
    it("debería crear una planificación y devolverla", async () => {
      repositoryMock.create.mockResolvedValue(planningPersistido);

      const resultado = await service.create(planning);

      expect(repositoryMock.create).toHaveBeenCalledWith(planning);
      expect(resultado).toEqual(planningPersistido);
    });
  });

  describe("findById", () => {
    it("debería devolver una planificación cuando existe", async () => {
      repositoryMock.findById.mockResolvedValue(planningPersistido);

      const resultado = await service.findById(1);

      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(planningPersistido);
    });

    it("debería devolver undefined cuando no existe", async () => {
      repositoryMock.findById.mockResolvedValue(undefined);

      const resultado = await service.findById(999);

      expect(repositoryMock.findById).toHaveBeenCalledWith(999);
      expect(resultado).toBeUndefined();
    });
  });

  describe("findAll", () => {
    it("debería devolver todas las planificaciones", async () => {
      repositoryMock.findAll.mockResolvedValue([planningPersistido]);

      const resultado = await service.findAll();

      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(resultado).toEqual([planningPersistido]);
    });

    it("debería devolver un array vacío cuando no hay planificaciones", async () => {
      repositoryMock.findAll.mockResolvedValue([]);

      const resultado = await service.findAll();

      expect(resultado).toEqual([]);
    });
  });

  describe("update", () => {
    it("debería actualizar una planificación existente", async () => {
      const planningActualizado = new Planning(
        "Working Holiday actualizada",
        "Preparar documentación del viaje",
        "travel",
        "Nueva Zelanda",
        new Date("2027-02-15"),
        7000,
      );

      const resultadoEsperado: PlanningPersistido = {
        ...planningActualizado,
        id: 1,
      };

      repositoryMock.update.mockResolvedValue(resultadoEsperado);

      const resultado = await service.update(1, planningActualizado);

      expect(repositoryMock.update).toHaveBeenCalledWith(
        1,
        planningActualizado,
      );
      expect(resultado).toEqual(resultadoEsperado);
    });

    it("debería devolver undefined cuando la planificación no existe", async () => {
      repositoryMock.update.mockResolvedValue(undefined);

      const resultado = await service.update(999, planning);

      expect(repositoryMock.update).toHaveBeenCalledWith(999, planning);
      expect(resultado).toBeUndefined();
    });
  });

  describe("delete", () => {
    it("debería devolver true cuando elimina una planificación", async () => {
      repositoryMock.delete.mockResolvedValue(true);

      const resultado = await service.delete(1);

      expect(repositoryMock.delete).toHaveBeenCalledWith(1);
      expect(resultado).toBe(true);
    });

    it("debería devolver false cuando la planificación no existe", async () => {
      repositoryMock.delete.mockResolvedValue(false);

      const resultado = await service.delete(999);

      expect(repositoryMock.delete).toHaveBeenCalledWith(999);
      expect(resultado).toBe(false);
    });
  });
});
