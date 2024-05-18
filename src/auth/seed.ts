import { AppDataSource } from '../data-source';
import { Role } from './entities/role.entity';

async function bootstrap() {
  await AppDataSource.initialize();
  const roleRepository = AppDataSource.getRepository(Role);

  const roles = ['user', 'admin', 'guest', 'owner'];

  for (const roleName of roles) {
    const role = new Role();
    role.name = roleName;
    await roleRepository.save(role);
  }

  await AppDataSource.destroy();
}

bootstrap();
