import { pool } from "../infrastructure/database/connection.ts";
import { Planning } from "../domain/planning/Planning.ts";

export interface PlanningPersistido extends Planning {
  id: number;
}

interface PlanningRow {
  id: number;
  title: string;
  description: string;
  category: Planning["category"];
  location: string;
  target_date: Date;
  estimated_budget: string | null;
}

export class PlanningRepository {
  async create(planning: Planning): Promise<PlanningPersistido> {
    const query = `
      INSERT INTO plannings (
        title,
        description,
        category,
        location,
        target_date,
        estimated_budget
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const resultado = await pool.query<PlanningRow>(query, [
      planning.title,
      planning.description,
      planning.category,
      planning.location,
      planning.targetDate,
      planning.estimatedBudget ?? null,
    ]);

    const fila = resultado.rows[0];
    if (!fila) {
      throw new Error("No se pudo guardar la planificación");
    }

    return {
      id: fila.id,
      title: fila.title,
      description: fila.description,
      category: fila.category,
      location: fila.location,
      targetDate: fila.target_date,
      estimatedBudget:
        fila.estimated_budget === null
          ? undefined
          : Number(fila.estimated_budget),
    };
  }
  async findById(id: number): Promise<PlanningPersistido | undefined> {
    const query = `
      SELECT *
      FROM plannings
      WHERE id = $1
    `;

    const resultado = await pool.query<PlanningRow>(query, [id]);

    const fila = resultado.rows[0];

    if (!fila) {
      return undefined;
    }

    return {
      id: fila.id,
      title: fila.title,
      description: fila.description,
      category: fila.category,
      location: fila.location,
      targetDate: fila.target_date,
      estimatedBudget:
        fila.estimated_budget === null
          ? undefined
          : Number(fila.estimated_budget),
    };
  }

  async findAll(): Promise<PlanningPersistido[]> {
    const query = `
    SELECT *
    FROM plannings
    ORDER BY id ASC
  `;

    const resultado = await pool.query<PlanningRow>(query);

    return resultado.rows.map((fila) => ({
      id: fila.id,
      title: fila.title,
      description: fila.description,
      category: fila.category,
      location: fila.location,
      targetDate: fila.target_date,
      estimatedBudget:
        fila.estimated_budget === null
          ? undefined
          : Number(fila.estimated_budget),
    }));
  }
}
