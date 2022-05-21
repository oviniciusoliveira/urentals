import { Specification } from '../../../entities/Specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface SpecificationsRepositoryInterface {
  create: (data: CreateSpecificationDTO) => Promise<void>;
  findByName: (name: string) => Promise<Specification | null>;
}
