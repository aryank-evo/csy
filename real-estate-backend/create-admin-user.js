const { sequelize } = require('./dist/config/database');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  try {
    console.log('Connecting to database...');
    
    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Import the User model
    const UserModel = require('./models/user');
    const User = UserModel(sequelize, require('sequelize').DataTypes);
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@csy.com' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      const hashedPassword = await bcrypt.hash('csy@Admin123', 10);
      await existingAdmin.update({
        password: hashedPassword,
        isAdmin: true
      });
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash('csy@Admin123', 10);
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@csy.com',
        password: hashedPassword,
        termsAccepted: true,
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '+1234567890',
        about: 'System Administrator'
      });
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@csy.com');
      console.log('Password: csy@Admin123');
    }
    
    // Verify the user was created/updated
    const verifyUser = await User.findOne({
      where: { email: 'admin@csy.com' },
      attributes: ['id', 'email', 'isAdmin', 'createdAt']
    });
    
    console.log('\nUser details:');
    console.log('ID:', verifyUser.id);
    console.log('Email:', verifyUser.email);
    console.log('Is Admin:', verifyUser.isAdmin);
    console.log('Created At:', verifyUser.createdAt);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    console.error('Error details:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

// Run the function
createAdminUser();