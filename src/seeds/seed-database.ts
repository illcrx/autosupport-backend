import { AppDataSource } from '../data-source';
import { Role } from '../auth/entities/role.entity';
import { Device } from '../chat/entities/device.entity';
import { Company } from '../auth/entities/company.entity';
import { User } from '../auth/entities/user.entity';
import { UserProfile } from '../auth/entities/user-profile.entity';
import { Solution } from '../chat/entities/solution.entity';

async function bootstrap() {
  await AppDataSource.initialize();
  console.log('Database initialized');

  // Seed roles
  const roleRepository = AppDataSource.getRepository(Role);
  const roles = ['user', 'admin', 'guest', 'owner'];
  for (const roleName of roles) {
    const role = new Role();
    role.name = roleName;
    await roleRepository.save(role);
    console.log(`Role ${roleName} saved`);
  }

  // Seed companies
  const companyRepository = AppDataSource.getRepository(Company);
  const companies = [
    { name: 'Example Company 1', address: '123 Main St', phone: '555-5555', paymentDetails: 'Credit Card' },
    { name: 'Example Company 2', address: '456 Elm St', phone: '555-1234', paymentDetails: 'PayPal' }
  ];
  for (const companyData of companies) {
    const company = new Company();
    company.name = companyData.name;
    company.address = companyData.address;
    company.phone = companyData.phone;
    company.paymentDetails = companyData.paymentDetails;
    await companyRepository.save(company);
    console.log(`Company ${companyData.name} saved`);
  }

  // Seed users
  const userRepository = AppDataSource.getRepository(User);
  const userProfileRepository = AppDataSource.getRepository(UserProfile);
  const users = [
    { username: 'admin', password: 'adminpass', email: 'admin@example.com', role: 'admin', company: 'Example Company 1', firstName: 'Admin', lastName: 'User' },
  ];
  for (const userData of users) {
    const role = await roleRepository.findOneBy({ name: userData.role });
    const company = await companyRepository.findOneBy({ name: userData.company });

    const user = new User();
    user.username = userData.username;
    user.password = userData.password;
    user.email = userData.email;
    user.role = role;
    user.company = company;
    await userRepository.save(user);
    console.log(`User ${userData.username} saved`);

    const userProfile = new UserProfile();
    userProfile.firstName = userData.firstName;
    userProfile.lastName = userData.lastName;
    userProfile.user = user;
    await userProfileRepository.save(userProfile);
    console.log(`UserProfile for ${userData.username} saved`);
  }

  // Seed devices and solutions
  const deviceRepository = AppDataSource.getRepository(Device);
  const solutionRepository = AppDataSource.getRepository(Solution);
  const devices = [
    { name: 'Device1', details: 'Details about Device1', solutions: [{ description: 'Solution1' }, { description: 'Solution2' }] },
    { name: 'Device2', details: 'Details about Device2', solutions: [{ description: 'Solution3' }] }
  ];
  for (const deviceData of devices) {
    const device = new Device();
    device.name = deviceData.name;
    device.details = deviceData.details;
    await deviceRepository.save(device);
    console.log(`Device ${deviceData.name} saved`);

    for (const solutionData of deviceData.solutions) {
      const solution = new Solution();
      solution.description = solutionData.description;
      solution.device = device;
      await solutionRepository.save(solution);
      console.log(`Solution for ${deviceData.name} saved`);
    }
  }

  await AppDataSource.destroy();
  console.log('Database connection closed');
}

export { bootstrap };
