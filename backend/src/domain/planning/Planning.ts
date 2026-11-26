
export type PlanningCategory =
  | "home"
  | "travel"
  | "study"
  | "personal"
  | "family"
  | "other";

export class Planning {
  readonly title: string;
  readonly description: string;
  readonly category: PlanningCategory;
  readonly location: string;
  readonly targetDate: Date;
  readonly estimatedBudget: number | undefined;

  constructor(
    title: string,
    description: string,
    category: PlanningCategory,
    location: string,
    targetDate: Date,
    estimatedBudget?: number
  ) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.location = location;
    this.targetDate = targetDate;
    this.estimatedBudget = estimatedBudget;
  }
}
