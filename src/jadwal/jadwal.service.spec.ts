import { Test, TestingModule } from '@nestjs/testing';
import { JadwalSidangService } from './jadwal.service';

describe('JadwalSidangService', () => {
  let service: JadwalSidangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JadwalSidangService],
    }).compile();

    service = module.get<JadwalSidangService>(JadwalSidangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
