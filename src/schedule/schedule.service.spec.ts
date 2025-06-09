import { Test, TestingModule } from '@nestjs/testing';
import { Schedule_service } from './schedule.service';

describe('Schedule_service', () => {
  let service: Schedule_service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Schedule_service],
    }).compile();

    service = module.get<Schedule_service>(Schedule_service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
