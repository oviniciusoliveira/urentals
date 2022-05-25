import { Specification } from '../../../entities/Specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface SpecificationsRepositoryInterface {
  create: (data: CreateSpecificationDTO) => Promise<Specification>;
  findByName: (name: string) => Promise<Specification | null>;
  findByIds: (ids: string[]) => Promise<Specification[]>;
}
