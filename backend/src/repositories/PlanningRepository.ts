import { Planning } from "../domain//planning/Planning.ts";

export interface PlanningPersistido extends Planning {
  id: number;
}

export class PlanningRepository {}
