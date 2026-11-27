export type PlanningCategory =
  | "home"
  | "travel"
  | "study"
  | "personal"
  | "family"
  | "other";

export interface Planning {
  title: string;
  description: string;
  category: PlanningCategory;
  location: string;
  targetDate: string;
  estimatedBudget?: number;
}

export interface PlanningPersistido extends Planning {
  id: number;
}