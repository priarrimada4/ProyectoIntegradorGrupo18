import { Planning } from "../domain/planning/Planning.ts";
import {
  PlanningRepository,
  type PlanningPersistido,
} from "../repositories/PlanningRepository.ts";

export class PlanningService {
  constructor(
    private readonly repository: PlanningRepository = new PlanningRepository(),
  ) {}

  async create(planning: Planning): Promise<PlanningPersistido> {
    return await this.repository.create(planning);
  }

  async findById(id: number): Promise<PlanningPersistido | undefined> {
    return await this.repository.findById(id);
  }

  async findAll(): Promise<PlanningPersistido[]> {
    return await this.repository.findAll();
  }

  async update(
    id: number,
    planning: Planning,
  ): Promise<PlanningPersistido | undefined> {
    return await this.repository.update(id, planning);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
