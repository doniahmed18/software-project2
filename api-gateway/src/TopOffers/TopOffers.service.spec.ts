import { Test, TestingModule } from '@nestjs/testing';
import { TopOffersService } from './TopOffers.service';

describe('AccountService', () => {
  let service: TopOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopOffersService],
    }).compile();

    service = module.get<TopOffersService>(TopOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
