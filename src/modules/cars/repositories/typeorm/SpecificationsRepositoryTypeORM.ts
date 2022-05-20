import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { SpecificationTypeORM } from '../../../../database/entities/Specifications';
import { Specification } from '../../entities/Specification';
import { CreateSpecificationDTO, SpecificationsRepositoryInterface } from '../interfaces/SpecificationsRepository';

export class SpecificationsRepositoryTypeORM implements SpecificationsRepositoryInterface {
  private repository: Repository<SpecificationTypeORM>;

  constructor() {
    this.repository = getRepository(SpecificationTypeORM);
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const newSpecification = this.repository.create({
      id: uuidV4(),
      name,
      description,
    });

    await this.repository.save(newSpecification);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ name });

    if (!specification) return null;

    return {
      id: specification.id,
      name: specification.name,
      description: specification.description,
      createdAt: specification.created_at,
    };
  }
}
