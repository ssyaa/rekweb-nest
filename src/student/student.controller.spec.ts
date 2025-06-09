import { Test, TestingModule } from '@nestjs/testing';
import { Student_controller } from './student.controller';

describe('Student_controller', () => {
  let controller: Student_controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Student_controller],
    }).compile();

    controller = module.get<Student_controller>(Student_controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
