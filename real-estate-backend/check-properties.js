const { sequelize } = require('./dist/config/database');

async function checkPropertyData() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Import property models
    const SaleProperty = require('./dist/models/SaleProperty').SaleProperty;
    const RentProperty = require('./dist/models/RentProperty').RentProperty;
    const LeaseProperty = require('./dist/models/LeaseProperty').LeaseProperty;
    const PgProperty = require('./dist/models/PgProperty').PgProperty;
    const CommercialProperty = require('./dist/models/CommercialProperty').CommercialProperty;
    const LandProperty = require('./dist/models/LandProperty').LandProperty;
    
    console.log('\n=== Property Database Analysis ===\n');
    
    // Check total records in each table
    const saleCount = await SaleProperty.count();
    const rentCount = await RentProperty.count();
    const leaseCount = await LeaseProperty.count();
    const pgCount = await PgProperty.count();
    const commercialCount = await CommercialProperty.count();
    const landCount = await LandProperty.count();
    
    console.log('Total Records:');
    console.log(`_sale_properties: ${saleCount}`);
    console.log(`rent_properties: ${rentCount}`);
    console.log(`lease_properties: ${leaseCount}`);
    console.log(`pg_properties: ${pgCount}`);
    console.log(`commercial_properties: ${commercialCount}`);
    console.log(`land_properties: ${landCount}`);
    
    console.log('\n=== Approval Status Analysis ===\n');
    
    // Check approval status distribution for each table
    const saleStatus = await SaleProperty.findAll({
      attributes: ['approvalStatus', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['approvalStatus'],
      raw: true
    });
    console.log('Sale Properties Approval Status:');
    saleStatus.forEach(status => {
      console.log(`  ${status.approvalStatus}: ${status.count}`);
    });
    
    const rentStatus = await RentProperty.findAll({
      attributes: ['approvalStatus', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['approvalStatus'],
      raw: true
    });
    console.log('Rent Properties Approval Status:');
    rentStatus.forEach(status => {
      console.log(`  ${status.approvalStatus}: ${status.count}`);
    });
    
    const leaseStatus = await LeaseProperty.findAll({
      attributes: ['approvalStatus', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['approvalStatus'],
      raw: true
    });
    console.log('Lease Properties Approval Status:');
    leaseStatus.forEach(status => {
      console.log(`  ${status.approvalStatus}: ${status.count}`);
    });
    
    // Sample a few records to see the actual data
    console.log('\n=== Sample Records (first 3) ===\n');
    
    const sampleSale = await SaleProperty.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']]
    });
    console.log('Sample Sale Properties:');
    sampleSale.forEach((prop, index) => {
      console.log(`  ${index + 1}. ID: ${prop.id}, Status: ${prop.approvalStatus}, Title: ${prop.title}`);
    });
    
    const sampleRent = await RentProperty.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']]
    });
    console.log('Sample Rent Properties:');
    sampleRent.forEach((prop, index) => {
      console.log(`  ${index + 1}. ID: ${prop.id}, Status: ${prop.approvalStatus}, Title: ${prop.title}`);
    });
    
    console.log('\n=== Approved Records Count ===\n');
    
    const approvedSaleCount = await SaleProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedRentCount = await RentProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedLeaseCount = await LeaseProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedPgCount = await PgProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedCommercialCount = await CommercialProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedLandCount = await LandProperty.count({
      where: { approvalStatus: 'approved' }
    });
    
    console.log('Approved Records:');
    console.log(`Sale: ${approvedSaleCount}/${saleCount}`);
    console.log(`Rent: ${approvedRentCount}/${rentCount}`);
    console.log(`Lease: ${approvedLeaseCount}/${leaseCount}`);
    console.log(`PG: ${approvedPgCount}/${pgCount}`);
    console.log(`Commercial: ${approvedCommercialCount}/${commercialCount}`);
    console.log(`Land: ${approvedLandCount}/${landCount}`);
    
  } catch (error) {
    console.error('Error checking property data:', error.message);
    console.error('Error details:', error);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the function
checkPropertyData();