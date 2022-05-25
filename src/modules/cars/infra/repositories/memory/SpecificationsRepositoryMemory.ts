import { v4 as uuidV4 } from 'uuid';

import { Specification } from '../../../entities/Specification';
import { CreateSpecificationDTO, SpecificationsRepositoryInterface } from '../interfaces/SpecificationsRepository';

export class SpecificationsRepositoryMemory implements SpecificationsRepositoryInterface {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create(data: CreateSpecificationDTO): Promise<Specification> {
    const newSpecification: Specification = {
      id: uuidV4(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
    };

    this.specifications.push(newSpecification);

    return newSpecification;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find((specification) => specification.name === name);

    if (!specification) return null;

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) => ids.includes(specification.id));
  }
}
