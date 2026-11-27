import { describe, it, expect, afterEach } from "vitest";
import { PlanningRepository } from "../../src/repositories/PlanningRepository.ts";
import { Planning } from "../../src/domain/planning/Planning.ts";
import { pool } from "../../src/infrastructure/database/connection.ts";

describe("PlanningRepository", () => {
  const repository = new PlanningRepository();
  const idsCreados: number[] = [];

  afterEach(async () => {
    // Elimina solamente los registros creados por estas pruebas.
    if (idsCreados.length > 0) {
      await pool.query("DELETE FROM plannings WHERE id = ANY($1::int[])", [
        idsCreados,
      ]);
      idsCreados.length = 0;
    }
  });

  describe("create", () => {
    it("debe guardar una planificación y devolverla con su id", async () => {
      const planning = new Planning(
        "Viaje de prueba",
        "Planificación creada para probar el repositorio",
        "travel",
        "Buenos Aires",
        new Date("2026-12-15T18:30:00-03:00"),
        150000,
      );

      const resultado = await repository.create(planning);
      idsCreados.push(resultado.id);

      expect(resultado.id).toBeDefined();
      expect(resultado.title).toBe(planning.title);
      expect(resultado.description).toBe(planning.description);
      expect(resultado.category).toBe(planning.category);
      expect(resultado.location).toBe(planning.location);
      expect(resultado.targetDate).toEqual(planning.targetDate);
      expect(Number(resultado.estimatedBudget)).toBe(150000);
    });
  });

  describe("findById", () => {
    it("debe encontrar una planificación por su id", async () => {
      const planning = new Planning(
        "Viaje de prueba",
        "Planificación para probar la búsqueda",
        "travel",
        "Buenos Aires",
        new Date("2026-12-15T18:30:00-03:00"),
        150000,
      );

      const creada = await repository.create(planning);
      idsCreados.push(creada.id);

      const resultado = await repository.findById(creada.id);

      expect(resultado).toBeDefined();
      expect(resultado?.id).toBe(creada.id);
      expect(resultado?.title).toBe(planning.title);
      expect(resultado?.category).toBe(planning.category);
    });

    it("debe devolver undefined cuando la planificación no existe", async () => {
      const resultado = await repository.findById(-1);

      expect(resultado).toBeUndefined();
    });
  });

  describe("findAll", () => {
    it("debe devolver todas las planificaciones guardadas", async () => {
      const planning1 = new Planning(
        "Viaje de prueba 1",
        "Primera planificación",
        "travel",
        "Buenos Aires",
        new Date("2026-12-15T18:30:00-03:00"),
        150000,
      );

      const planning2 = new Planning(
        "Estudio de prueba",
        "Segunda planificación",
        "study",
        "Bahía Blanca",
        new Date("2026-12-20T10:00:00-03:00"),
      );

      const creada1 = await repository.create(planning1);
      const creada2 = await repository.create(planning2);

      idsCreados.push(creada1.id, creada2.id);

      const resultado = await repository.findAll();

      expect(resultado).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: creada1.id,
            title: planning1.title,
            category: planning1.category,
            location: planning1.location,
            estimatedBudget: 150000,
          }),
          expect.objectContaining({
            id: creada2.id,
            title: planning2.title,
            category: planning2.category,
            location: planning2.location,
            estimatedBudget: undefined,
          }),
        ]),
      );
    });

    it("debe devolver un array", async () => {
      const resultado = await repository.findAll();

      expect(Array.isArray(resultado)).toBe(true);
    });
  });

  describe("update", () => {
    it("debe actualizar una planificación existente", async () => {
      const planning = new Planning(
        "Viaje original",
        "Descripción original",
        "travel",
        "Buenos Aires",
        new Date("2026-12-15T18:30:00-03:00"),
        150000,
      );

      const creada = await repository.create(planning);
      idsCreados.push(creada.id);

      const actualizado = new Planning(
        "Viaje actualizado",
        "Nueva descripción",
        "family",
        "Córdoba",
        new Date("2027-01-20T10:00:00-03:00"),
        200000,
      );

      const resultado = await repository.update(creada.id, actualizado);

      expect(resultado).toBeDefined();
      expect(resultado?.id).toBe(creada.id);
      expect(resultado?.title).toBe("Viaje actualizado");
      expect(resultado?.description).toBe("Nueva descripción");
      expect(resultado?.category).toBe("family");
      expect(resultado?.location).toBe("Córdoba");
      expect(resultado?.targetDate).toEqual(actualizado.targetDate);
      expect(resultado?.estimatedBudget).toBe(200000);
    });

    it("debe permitir actualizar una planificación sin presupuesto", async () => {
      const planning = new Planning(
        "Plan original",
        "Descripción original",
        "study",
        "Bahía Blanca",
        new Date("2026-12-15T18:30:00-03:00"),
        100000,
      );

      const creada = await repository.create(planning);
      idsCreados.push(creada.id);

      const actualizado = new Planning(
        "Plan sin presupuesto",
        "Presupuesto eliminado",
        "study",
        "Bahía Blanca",
        new Date("2026-12-20T10:00:00-03:00"),
      );

      const resultado = await repository.update(creada.id, actualizado);

      expect(resultado?.estimatedBudget).toBeUndefined();
    });

    it("debe devolver undefined si la planificación no existe", async () => {
      const planning = new Planning(
        "Plan inexistente",
        "No debe guardarse",
        "personal",
        "Bahía Blanca",
        new Date("2026-12-15T18:30:00-03:00"),
      );

      const resultado = await repository.update(-1, planning);

      expect(resultado).toBeUndefined();
    });
  });
});
