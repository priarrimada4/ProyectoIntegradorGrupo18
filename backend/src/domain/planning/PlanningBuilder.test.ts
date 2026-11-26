import { describe, it, expect } from "vitest";
import { PlanningBuilder } from "./PlanningBuilder.ts";

describe("PlanningBuilder", () => {
  it("debería construir una planificación con todos los datos", () => {
    const planning = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje a Nueva Zelanda")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"))
      .setEstimatedBudget(6000)
      .build();

    expect(planning.title).toBe("Preparar Working Holiday");
    expect(planning.category).toBe("travel");
    expect(planning.estimatedBudget).toBe(6000);
  });

  it("debería permitir construir una planificación sin presupuesto", () => {
    const planning = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"))
      .build();

    expect(planning.estimatedBudget).toBeUndefined();
  });

  it("debería lanzar un error si faltan datos obligatorios", () => {
    const builder = new PlanningBuilder()
      .setTitle("Preparar Working Holiday");

    expect(() => builder.build()).toThrow(
      "Faltan datos obligatorios para crear la planificación"
    );
  });
});