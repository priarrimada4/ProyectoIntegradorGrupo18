import { describe, it, expect } from "vitest";
import { PlanningRepository } from "../../src/repositories/PlanningRepository.ts";
import { Planning } from "../../src/domain/planning/Planning.ts";

describe("PlanningRepository", () => {
  describe("create", () => {
    it("debe guardar una planificación y devolverla con su id", async () => {
      const repository = new PlanningRepository();

      const planning = new Planning(
        "Viaje de prueba",
        "Planificación creada para probar el repositorio",
        "travel",
        "Buenos Aires",
        new Date("2026-12-15T18:30:00-03:00"),
        150000,
      );

      const resultado = await repository.create(planning);

      expect(resultado.id).toBeDefined();
      expect(resultado.title).toBe(planning.title);
      expect(resultado.description).toBe(planning.description);
      expect(resultado.category).toBe(planning.category);
      expect(resultado.location).toBe(planning.location);
      expect(resultado.targetDate).toEqual(planning.targetDate);
      expect(Number(resultado.estimatedBudget)).toBe(150000);
    });
  });
});
