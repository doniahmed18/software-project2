import { Test, TestingModule } from '@nestjs/testing';
import { wishlistService } from './Wishlist.service';

describe('wishlistService', () => {
  let service: wishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [wishlistService],
    }).compile();

    service = module.get<wishlistService>(wishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
