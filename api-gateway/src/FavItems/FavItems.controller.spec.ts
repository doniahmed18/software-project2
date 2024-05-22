import { Test, TestingModule } from '@nestjs/testing';
import { FavItemsController } from './FavItems.controller';

describe('FavItemsController', () => {
  let controller: FavItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavItemsController],
    }).compile();

    controller = module.get<FavItemsController>(FavItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
