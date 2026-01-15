import { sequelize } from './src/config/database';
import { User } from './src/models';

async function checkAdminUser() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    const adminUser = await User.findOne({ where: { email: 'admin@example.com' } });
    if (adminUser) {
      console.log('Admin user found:');
      console.log('ID:', adminUser.id);
      console.log('Name:', adminUser.name);
      console.log('Email:', adminUser.email);
      console.log('Is Admin:', adminUser.isAdmin);
    } else {
      console.log('Admin user not found');
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

checkAdminUser();