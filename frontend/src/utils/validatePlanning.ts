import type { Planning } from "../types/planning";

export function validatePlanning(
  _planning: Planning
): Partial<Record<keyof Planning, string>> {
  return {};
}