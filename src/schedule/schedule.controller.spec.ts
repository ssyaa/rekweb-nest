import { Test, TestingModule } from '@nestjs/testing';
import { Schedule_controller } from './schedule.controller';

describe('Schedule_controller', () => {
  let controller: Schedule_controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Schedule_controller],
    }).compile();

    controller = module.get<Schedule_controller>(Schedule_controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
