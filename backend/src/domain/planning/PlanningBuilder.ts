
import { Planning, type PlanningCategory } from "./Planning.ts";

const VALID_CATEGORIES: PlanningCategory[] = [
  "home",
  "travel",
  "study",
  "personal",
  "family",
  "other"
];

export class PlanningBuilder {
  private title?: string;
  private description?: string;
  private category?: PlanningCategory;
  private location?: string;
  private targetDate?: Date;
  private estimatedBudget?: number;

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setCategory(category: PlanningCategory): this {
    this.category = category;
    return this;
  }

  setLocation(location: string): this {
    this.location = location;
    return this;
  }

  setTargetDate(targetDate: Date): this {
    this.targetDate = targetDate;
    return this;
  }

  setEstimatedBudget(estimatedBudget: number): this {
    this.estimatedBudget = estimatedBudget;
    return this;
  }

  build(): Planning {
    // Validar los datos obligatorios
    if (
      !this.title?.trim() ||
      !this.description?.trim() ||
      !this.category ||
      !this.location?.trim() ||
      !this.targetDate
    ) {
      throw new Error(
        "Faltan datos obligatorios para crear la planificación"
      );
    }

    // Validar la fecha
    if (Number.isNaN(this.targetDate.getTime())) {
      throw new Error("La fecha de la planificación no es válida");
    }

    // Validar la categoría
    if (!VALID_CATEGORIES.includes(this.category)) {
      throw new Error("La categoría de la planificación no es válida");
    }

    // Validar el presupuesto opcional
    if (
      this.estimatedBudget !== undefined &&
      (!Number.isFinite(this.estimatedBudget) || this.estimatedBudget < 0)
    ) {
      throw new Error(
        "El presupuesto no puede ser negativo ni inválido"
      );
    }

    // Construir la planificación
    return new Planning(
      this.title,
      this.description,
      this.category,
      this.location,
      this.targetDate,
      this.estimatedBudget
    );
  }
}

