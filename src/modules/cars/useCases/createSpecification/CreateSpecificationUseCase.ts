import {
  CreateSpecificationDTO,
  SpecificationsRepositoryInterface,
} from '../../infra/repositories/interfaces/SpecificationsRepository';

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepositoryInterface) {}

  async perform({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}
