import { Test, TestingModule } from '@nestjs/testing';
import { Examiner_controller } from './examiner.controller';

describe('Examiner_controller', () => {
  let controller: Examiner_controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Examiner_controller],
    }).compile();

    controller = module.get<Examiner_controller>(Examiner_controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
