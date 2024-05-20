import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { Role } from '../../src/auth/entities/role.entity';
import { Blacklist } from '../../src/auth/blacklist.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Blacklist),
          useClass: Repository,
        },
      ],
    }).compile();

    console.log('Module compiled');

    service = module.get<AuthService>(AuthService);
    console.log('********Service instance:', service);
  });

  it('should be defined', () => {
    console.log('********Service:', service);
    expect(service).toBeDefined();
  });
});
