import { SpecificationsRepository } from '../../infra/repositories';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export function createSpecificationControllerFactory(): CreateSpecificationController {
  const specificationRepository = new SpecificationsRepository();
  const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
  return new CreateSpecificationController(createSpecificationUseCase);
}
