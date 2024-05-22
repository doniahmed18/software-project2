import { Test, TestingModule } from '@nestjs/testing';
import { TopOffersController } from './TopOffers.controller';

describe('TopOffersController', () => {
  let controller: TopOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopOffersController],
    }).compile();

    controller = module.get<TopOffersController>(TopOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
