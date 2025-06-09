import { Test, TestingModule } from '@nestjs/testing';
import { Submission_service } from './submission.service';

describe('Submission_service', () => {
  let service: Submission_service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Submission_service],
    }).compile();

    service = module.get<Submission_service>(Submission_service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
