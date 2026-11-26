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

  it("no debería aceptar un título compuesto por espacios", () => {
    const builder = new PlanningBuilder()
      .setTitle("   ")
      .setDescription("Organizar el viaje")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"));

    expect(() => builder.build()).toThrow(
      "Faltan datos obligatorios para crear la planificación"
    );
  });

  it("no debería aceptar una descripción vacía", () => {
    const builder = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("   ")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"));

    expect(() => builder.build()).toThrow(
      "Faltan datos obligatorios para crear la planificación"
    );
  });

  it("no debería aceptar una fecha inválida", () => {
    const builder = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("fecha incorrecta"));

    expect(() => builder.build()).toThrow(
     "La fecha de la planificación no es válida"
    );
  });

  it("no debería aceptar una categoría inválida", () => {
    const builder = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje")
      .setCategory("invalid" as "travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"));

    expect(() => builder.build()).toThrow(
      "La categoría de la planificación no es válida"
    );
  });

  it("no debería aceptar un presupuesto negativo", () => {
    const builder = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"))
      .setEstimatedBudget(-100);

    expect(() => builder.build()).toThrow(
      "El presupuesto no puede ser negativo ni inválido"
    );
  });

  it("debería permitir un presupuesto igual a cero", () => {
    const planning = new PlanningBuilder()
      .setTitle("Preparar Working Holiday")
      .setDescription("Organizar el viaje")
      .setCategory("travel")
      .setLocation("Nueva Zelanda")
      .setTargetDate(new Date("2027-01-15"))
      .setEstimatedBudget(0)
      .build();

    expect(planning.estimatedBudget).toBe(0);
  });
  it("no debería aceptar una ubicación compuesta por espacios", () => {
  const builder = new PlanningBuilder()
    .setTitle("Preparar Working Holiday")
    .setDescription("Organizar el viaje")
    .setCategory("travel")
    .setLocation("   ")
    .setTargetDate(new Date("2027-01-15"));

  expect(() => builder.build()).toThrow(
    "Faltan datos obligatorios para crear la planificación"
  );
});

it("no debería aceptar un presupuesto infinito", () => {
  const builder = new PlanningBuilder()
    .setTitle("Preparar Working Holiday")
    .setDescription("Organizar el viaje")
    .setCategory("travel")
    .setLocation("Nueva Zelanda")
    .setTargetDate(new Date("2027-01-15"))
    .setEstimatedBudget(Infinity);

  expect(() => builder.build()).toThrow(
    "El presupuesto no puede ser negativo ni inválido"
  );
});

});