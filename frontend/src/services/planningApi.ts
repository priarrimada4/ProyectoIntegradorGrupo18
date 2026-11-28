import type { Planning, PlanningPersistido } from "../types/planning";

const API_URL = "/plannings";

function normalizePlanning(
  planning: PlanningPersistido
): PlanningPersistido {
  return {
    ...planning,
    targetDate: planning.targetDate.slice(0, 10)
  };
}

export async function getPlannings(): Promise<PlanningPersistido[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las planificaciones");
  }

  const data: PlanningPersistido[] = await response.json();

  return data.map(normalizePlanning);
}

export async function createPlanning(
  planning: Planning
): Promise<PlanningPersistido> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(planning)
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la planificación");
  }

  return normalizePlanning(await response.json());
}

export async function updatePlanning(
  id: number,
  planning: Planning
): Promise<PlanningPersistido> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(planning)
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar la planificación");
  }

  return normalizePlanning(await response.json());
}
export async function deletePlanning(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la planificación");
  }
}