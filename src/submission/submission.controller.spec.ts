import { Test, TestingModule } from '@nestjs/testing';
import { Submission_controller } from './submission.controller';

describe('Submission_controller', () => {
  let controller: Submission_controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Submission_controller],
    }).compile();

    controller = module.get<Submission_controller>(Submission_controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
