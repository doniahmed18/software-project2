import { Test, TestingModule } from '@nestjs/testing';
import { FavItemsService } from './FavItemsservice';

describe('CartService', () => {
  let service: FavItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavItemsService],
    }).compile();

    service = module.get<FavItemsService>(FavItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
