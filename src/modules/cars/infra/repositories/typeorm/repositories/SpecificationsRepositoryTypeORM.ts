import { Specification } from 'src/modules/cars/entities/Specification';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CreateSpecificationDTO, SpecificationsRepositoryInterface } from '../../interfaces/SpecificationsRepository';
import { SpecificationTypeORM } from '../entities/Specifications';

export class SpecificationsRepositoryTypeORM implements SpecificationsRepositoryInterface {
  private repository: Repository<SpecificationTypeORM>;

  constructor() {
    this.repository = getRepository(SpecificationTypeORM);
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<Specification> {
    const newSpecification = this.repository.create({
      id: uuidV4(),
      name,
      description,
    });

    const specification = await this.repository.save(newSpecification);

    return this.mapSpecificationFromTypeORM(specification);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ name });

    if (!specification) return null;

    return this.mapSpecificationFromTypeORM(specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);

    return specifications.map((specification) => this.mapSpecificationFromTypeORM(specification));
  }

  private mapSpecificationFromTypeORM(specification: SpecificationTypeORM): Specification {
    return {
      id: specification.id,
      name: specification.name,
      description: specification.description,
      createdAt: specification.created_at,
    };
  }
}
