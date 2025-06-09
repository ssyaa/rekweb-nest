import { Test, TestingModule } from '@nestjs/testing';
import { Student_service } from './student.service';

describe('Student_service', () => {
  let service: Student_service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Student_service],
    }).compile();

    service = module.get<Student_service>(Student_service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
