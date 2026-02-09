const { sequelize } = require('./dist/config/database');

async function approveAllProperties() {
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
    
    console.log('\n=== Approving All Properties ===\n');
    
    // Approve all pending properties
    const [saleUpdated] = await SaleProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${saleUpdated} sale properties`);
    
    const [rentUpdated] = await RentProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${rentUpdated} rent properties`);
    
    const [leaseUpdated] = await LeaseProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${leaseUpdated} lease properties`);
    
    const [pgUpdated] = await PgProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${pgUpdated} PG properties`);
    
    const [commercialUpdated] = await CommercialProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${commercialUpdated} commercial properties`);
    
    const [landUpdated] = await LandProperty.update(
      { approvalStatus: 'approved', approvedAt: new Date() },
      { where: { approvalStatus: 'pending' } }
    );
    console.log(`✅ Approved ${landUpdated} land properties`);
    
    console.log('\n=== Verification ===\n');
    
    // Verify the changes
    const approvedSaleCount = await SaleProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const approvedRentCount = await RentProperty.count({
      where: { approvalStatus: 'approved' }
    });
    const totalSaleCount = await SaleProperty.count();
    const totalRentCount = await RentProperty.count();
    
    console.log(`Sale Properties: ${approvedSaleCount}/${totalSaleCount} approved`);
    console.log(`Rent Properties: ${approvedRentCount}/${totalRentCount} approved`);
    
    if (approvedSaleCount > 0 || approvedRentCount > 0) {
      console.log('\n🎉 Properties are now approved and should appear in API responses!');
    }
    
  } catch (error) {
    console.error('Error approving properties:', error.message);
    console.error('Error details:', error);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the function
approveAllProperties();