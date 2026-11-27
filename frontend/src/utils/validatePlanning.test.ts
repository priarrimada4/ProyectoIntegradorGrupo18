import { describe, it, expect } from "vitest";
import { validatePlanning } from "./validatePlanning";
import type { Planning } from "../types/planning";

const validPlanning: Planning = {
  title: "Organizar vacaciones",
  description: "Planificar viaje familiar",
  category: "travel",
  location: "Brasil",
  targetDate: "2027-01-15",
  estimatedBudget: 500000
};

describe("Validaciones de planificación", () => {
  it("acepta una planificación válida", () => {
    expect(validatePlanning(validPlanning)).toEqual({});
  });

  it("rechaza un título vacío", () => {
    const errors = validatePlanning({
      ...validPlanning,
      title: ""
    });

    expect(errors.title).toBeDefined();
  });

  it("rechaza una descripción con espacios", () => {
    const errors = validatePlanning({
      ...validPlanning,
      description: "   "
    });

    expect(errors.description).toBeDefined();
  });

  it("rechaza una ubicación vacía", () => {
    const errors = validatePlanning({
      ...validPlanning,
      location: ""
    });

    expect(errors.location).toBeDefined();
  });

  it("rechaza una fecha inválida", () => {
    const errors = validatePlanning({
      ...validPlanning,
      targetDate: "fecha incorrecta"
    });

    expect(errors.targetDate).toBeDefined();
  });

  it("rechaza un presupuesto negativo", () => {
    const errors = validatePlanning({
      ...validPlanning,
      estimatedBudget: -100
    });

    expect(errors.estimatedBudget).toBeDefined();
  });

  it("acepta un presupuesto igual a cero", () => {
    expect(validatePlanning({
      ...validPlanning,
      estimatedBudget: 0
    })).toEqual({});
  });

  it("acepta una planificación sin presupuesto", () => {
    const { estimatedBudget, ...planning } = validPlanning;

    expect(validatePlanning(planning)).toEqual({});
  });

  it("rechaza una categoría no permitida", () => {
    const errors = validatePlanning({
      ...validPlanning,
      category: "invalid" as Planning["category"]
    });

    expect(errors.category).toBeDefined();
  });

  it("rechaza un presupuesto infinito", () => {
    const errors = validatePlanning({
      ...validPlanning,
      estimatedBudget: Infinity
    });

    expect(errors.estimatedBudget).toBeDefined();
  });
});