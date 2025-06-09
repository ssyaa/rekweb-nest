import { Test, TestingModule } from '@nestjs/testing';
import { Examiner_service } from './examiner.service';

describe('Examiner_service', () => {
  let service: Examiner_service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Examiner_service],
    }).compile();

    service = module.get<Examiner_service>(Examiner_service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
