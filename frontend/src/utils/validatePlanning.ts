import type { Planning, PlanningCategory } from "../types/planning";

const VALID_CATEGORIES: PlanningCategory[] = [
  "home",
  "travel",
  "study",
  "personal",
  "family",
  "other"
];

export function validatePlanning(
  planning: Planning
): Partial<Record<keyof Planning, string>> {
  const errors: Partial<Record<keyof Planning, string>> = {};

  if (!planning.title.trim()) {
    errors.title = "El título es obligatorio";
  }

  if (!planning.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!VALID_CATEGORIES.includes(planning.category)) {
    errors.category = "Seleccioná una categoría válida";
  }

  if (!planning.location.trim()) {
    errors.location = "La ubicación es obligatoria";
  }

  if (
    !planning.targetDate ||
    Number.isNaN(new Date(planning.targetDate).getTime())
  ) {
    errors.targetDate = "Ingresá una fecha válida";
  }

  if (
    planning.estimatedBudget !== undefined &&
    (!Number.isFinite(planning.estimatedBudget) ||
      planning.estimatedBudget < 0)
  ) {
    errors.estimatedBudget = "El presupuesto debe ser un número válido mayor o igual a cero";
  }

  return errors;
}