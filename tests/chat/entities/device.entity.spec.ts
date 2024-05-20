import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../../src/chat/entities/device.entity';
import { DeviceService } from '../../../src/chat/device.service';

describe('DeviceService', () => {
  let service: DeviceService;
  let repository: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getRepositoryToken(Device),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    repository = module.get<Repository<Device>>(getRepositoryToken(Device));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a device', async () => {
    const device = new Device();
    device.name = 'Device1';
    device.details = 'Details about Device1';

    jest.spyOn(repository, 'save').mockResolvedValue(device);

    expect(await service.create(device)).toEqual(device);
  });

  it('should find all devices', async () => {
    const device = new Device();
    device.name = 'Device1';
    device.details = 'Details about Device1';

    jest.spyOn(repository, 'find').mockResolvedValue([device]);

    expect(await service.findAll()).toEqual([device]);
  });

  it('should find one device', async () => {
    const device = new Device();
    device.name = 'Device1';
    device.details = 'Details about Device1';

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(device);

    expect(await service.findOne(1)).toEqual(device);
  });

  it('should update a device', async () => {
    const device = new Device();
    device.name = 'Device1';
    device.details = 'Details about Device1';

    jest.spyOn(repository, 'save').mockResolvedValue(device);

    expect(await service.update(1, device)).toEqual(device);
  });

  it('should remove a device', async () => {
    const device = new Device();
    device.name = 'Device1';
    device.details = 'Details about Device1';

    jest.spyOn(repository, 'remove').mockResolvedValue(device);

    expect(await service.remove(1)).toEqual(device);
  });
});
