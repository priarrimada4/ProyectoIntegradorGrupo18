
import { Planning, type PlanningCategory } from "./Planning.ts";

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
    if (
      !this.title ||
      !this.description ||
      !this.category ||
      !this.location ||
      !this.targetDate
    ) {
      throw new Error("Faltan datos obligatorios para crear la planificación");
    }

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
