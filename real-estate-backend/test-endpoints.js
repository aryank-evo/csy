const { sequelize } = require('./dist/config/database');

async function testPropertyEndpoints() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Import property models
    const SaleProperty = require('./dist/models/SaleProperty').SaleProperty;
    const RentProperty = require('./dist/models/RentProperty').RentProperty;
    
    console.log('\n=== Testing Property Endpoint Logic ===\n');
    
    // Test 1: Get only approved properties (current behavior)
    console.log('1. Approved properties only:');
    const approvedProperties = await SaleProperty.findAll({
      where: { approvalStatus: 'approved' },
      order: [['createdAt', 'DESC']]
    });
    console.log(`   Count: ${approvedProperties.length}`);
    
    // Test 2: Get all properties (new admin behavior)
    console.log('2. All properties (admin view):');
    const allProperties = await SaleProperty.findAll({
      order: [['createdAt', 'DESC']]
    });
    console.log(`   Count: ${allProperties.length}`);
    
    // Test 3: Get pending properties
    console.log('3. Pending properties:');
    const pendingProperties = await SaleProperty.findAll({
      where: { approvalStatus: 'pending' },
      order: [['createdAt', 'DESC']]
    });
    console.log(`   Count: ${pendingProperties.length}`);
    
    console.log('\n=== Property Status Distribution ===');
    const statusDistribution = await SaleProperty.findAll({
      attributes: ['approvalStatus', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['approvalStatus'],
      raw: true
    });
    
    statusDistribution.forEach(status => {
      console.log(`   ${status.approvalStatus}: ${status.count}`);
    });
    
    console.log('\n=== Sample Properties ===');
    const sampleProperties = await SaleProperty.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']]
    });
    
    sampleProperties.forEach((prop, index) => {
      console.log(`   ${index + 1}. ID: ${prop.id}, Status: ${prop.approvalStatus}, Title: ${prop.title}`);
    });
    
  } catch (error) {
    console.error('Error testing property endpoints:', error.message);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the function
testPropertyEndpoints();