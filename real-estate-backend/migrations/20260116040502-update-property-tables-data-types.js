'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if maintenanceCharge column exists in sale_properties table before attempting to modify it
    const [salePropertiesColumns] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'sale_properties' 
      AND column_name = 'maintenanceCharge'
    `);
    
    // Update sale_properties table
    // First, clean and update price column to handle any non-numeric values
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    // Update bedrooms column
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET bedrooms = NULL 
      WHERE bedrooms IS NULL 
         OR TRIM(bedrooms::TEXT) = '' 
         OR bedrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "bedrooms" TYPE INTEGER 
      USING CASE 
        WHEN bedrooms::TEXT ~ '^[0-9]+$' THEN bedrooms::INTEGER 
        ELSE NULL 
      END
    `);

    // Update bathrooms column
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET bathrooms = NULL 
      WHERE bathrooms IS NULL 
         OR TRIM(bathrooms::TEXT) = '' 
         OR bathrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "bathrooms" TYPE INTEGER 
      USING CASE 
        WHEN bathrooms::TEXT ~ '^[0-9]+$' THEN bathrooms::INTEGER 
        ELSE NULL 
      END
    `);

    // Update area column
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET area = NULL 
      WHERE area IS NULL 
         OR TRIM(area::TEXT) = '' 
         OR area::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "area" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN area::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN area::NUMERIC 
        ELSE NULL 
      END
    `);

    // Update approvalStatus column - first handle existing values that are not in enum
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    // Temporarily drop default to avoid conflicts
    await queryInterface.sequelize.query('ALTER TABLE "sale_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    // Add enum type if it doesn't exist
    await queryInterface.sequelize.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'approval_status_enum') THEN
          CREATE TYPE approval_status_enum AS ENUM ('pending', 'approved', 'rejected');
        END IF;
      END 
      $$;
    `);
    // Change column type to enum
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    // Set default value
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    // Update propertyAge column
    await queryInterface.sequelize.query(`
      UPDATE sale_properties 
      SET "propertyAge" = NULL 
      WHERE "propertyAge" IS NULL 
         OR TRIM("propertyAge"::TEXT) = '' 
         OR "propertyAge"::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "sale_properties" 
      ALTER COLUMN "propertyAge" TYPE INTEGER 
      USING CASE 
        WHEN "propertyAge"::TEXT ~ '^[0-9]+$' THEN "propertyAge"::INTEGER 
        ELSE NULL 
      END
    `);

    // Only update maintenanceCharge if the column exists
    if (salePropertiesColumns.length > 0) {
      await queryInterface.sequelize.query(`
        UPDATE sale_properties 
        SET "maintenanceCharge" = NULL 
        WHERE "maintenanceCharge" IS NULL 
           OR TRIM("maintenanceCharge"::TEXT) = '' 
           OR "maintenanceCharge"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
      `);
      // Change column type with USING clause for explicit conversion
      await queryInterface.sequelize.query(`
        ALTER TABLE "sale_properties" 
        ALTER COLUMN "maintenanceCharge" TYPE DECIMAL(10,2) 
        USING CASE 
          WHEN "maintenanceCharge"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "maintenanceCharge"::NUMERIC 
          ELSE NULL 
        END
      `);
    }

    // Check if maintenanceCharge column exists in rent_properties table before attempting to modify it
    const [rentPropertiesColumns] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'rent_properties' 
      AND column_name = 'maintenanceCharge'
    `);
    
    // Update rent_properties table
    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET bedrooms = NULL 
      WHERE bedrooms IS NULL 
         OR TRIM(bedrooms::TEXT) = '' 
         OR bedrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "bedrooms" TYPE INTEGER 
      USING CASE 
        WHEN bedrooms::TEXT ~ '^[0-9]+$' THEN bedrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET bathrooms = NULL 
      WHERE bathrooms IS NULL 
         OR TRIM(bathrooms::TEXT) = '' 
         OR bathrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "bathrooms" TYPE INTEGER 
      USING CASE 
        WHEN bathrooms::TEXT ~ '^[0-9]+$' THEN bathrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET area = NULL 
      WHERE area IS NULL 
         OR TRIM(area::TEXT) = '' 
         OR area::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "area" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN area::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN area::NUMERIC 
        ELSE NULL 
      END
    `);

    // Handle approvalStatus for rent_properties
    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    await queryInterface.sequelize.query('ALTER TABLE "rent_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    await queryInterface.sequelize.query(`
      UPDATE rent_properties 
      SET "securityDeposit" = NULL 
      WHERE "securityDeposit" IS NULL 
         OR TRIM("securityDeposit"::TEXT) = '' 
         OR "securityDeposit"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "rent_properties" 
      ALTER COLUMN "securityDeposit" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN "securityDeposit"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "securityDeposit"::NUMERIC 
        ELSE NULL 
      END
    `);

    // Only update maintenanceCharge if the column exists
    if (rentPropertiesColumns.length > 0) {
      await queryInterface.sequelize.query(`
        UPDATE rent_properties 
        SET "maintenanceCharge" = NULL 
        WHERE "maintenanceCharge" IS NULL 
           OR TRIM("maintenanceCharge"::TEXT) = '' 
           OR "maintenanceCharge"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
      `);
      // Change column type with USING clause for explicit conversion
      await queryInterface.sequelize.query(`
        ALTER TABLE "rent_properties" 
        ALTER COLUMN "maintenanceCharge" TYPE DECIMAL(10,2) 
        USING CASE 
          WHEN "maintenanceCharge"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "maintenanceCharge"::NUMERIC 
          ELSE NULL 
        END
      `);
    }

    // Update lease_properties table
    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET bedrooms = NULL 
      WHERE bedrooms IS NULL 
         OR TRIM(bedrooms::TEXT) = '' 
         OR bedrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "bedrooms" TYPE INTEGER 
      USING CASE 
        WHEN bedrooms::TEXT ~ '^[0-9]+$' THEN bedrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET bathrooms = NULL 
      WHERE bathrooms IS NULL 
         OR TRIM(bathrooms::TEXT) = '' 
         OR bathrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "bathrooms" TYPE INTEGER 
      USING CASE 
        WHEN bathrooms::TEXT ~ '^[0-9]+$' THEN bathrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET area = NULL 
      WHERE area IS NULL 
         OR TRIM(area::TEXT) = '' 
         OR area::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "area" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN area::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN area::NUMERIC 
        ELSE NULL 
      END
    `);

    // Handle approvalStatus for lease_properties
    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    await queryInterface.sequelize.query('ALTER TABLE "lease_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    await queryInterface.sequelize.query(`
      UPDATE lease_properties 
      SET "monthlyLeaseAmount" = NULL 
      WHERE "monthlyLeaseAmount" IS NULL 
         OR TRIM("monthlyLeaseAmount"::TEXT) = '' 
         OR "monthlyLeaseAmount"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "lease_properties" 
      ALTER COLUMN "monthlyLeaseAmount" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN "monthlyLeaseAmount"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "monthlyLeaseAmount"::NUMERIC 
        ELSE NULL 
      END
    `);

    // Update pg_properties table
    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET bedrooms = NULL 
      WHERE bedrooms IS NULL 
         OR TRIM(bedrooms::TEXT) = '' 
         OR bedrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "bedrooms" TYPE INTEGER 
      USING CASE 
        WHEN bedrooms::TEXT ~ '^[0-9]+$' THEN bedrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET bathrooms = NULL 
      WHERE bathrooms IS NULL 
         OR TRIM(bathrooms::TEXT) = '' 
         OR bathrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "bathrooms" TYPE INTEGER 
      USING CASE 
        WHEN bathrooms::TEXT ~ '^[0-9]+$' THEN bathrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET area = NULL 
      WHERE area IS NULL 
         OR TRIM(area::TEXT) = '' 
         OR area::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "area" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN area::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN area::NUMERIC 
        ELSE NULL 
      END
    `);

    // Handle approvalStatus for pg_properties
    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    await queryInterface.sequelize.query('ALTER TABLE "pg_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    await queryInterface.sequelize.query(`
      UPDATE pg_properties 
      SET occupancy = NULL 
      WHERE occupancy IS NULL 
         OR TRIM(occupancy::TEXT) = '' 
         OR occupancy::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "pg_properties" 
      ALTER COLUMN "occupancy" TYPE INTEGER 
      USING CASE 
        WHEN occupancy::TEXT ~ '^[0-9]+$' THEN occupancy::INTEGER 
        ELSE NULL 
      END
    `);

    // Update commercial_properties table
    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET bedrooms = NULL 
      WHERE bedrooms IS NULL 
         OR TRIM(bedrooms::TEXT) = '' 
         OR bedrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "bedrooms" TYPE INTEGER 
      USING CASE 
        WHEN bedrooms::TEXT ~ '^[0-9]+$' THEN bedrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET bathrooms = NULL 
      WHERE bathrooms IS NULL 
         OR TRIM(bathrooms::TEXT) = '' 
         OR bathrooms::TEXT !~ '^[0-9]+$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "bathrooms" TYPE INTEGER 
      USING CASE 
        WHEN bathrooms::TEXT ~ '^[0-9]+$' THEN bathrooms::INTEGER 
        ELSE NULL 
      END
    `);

    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET area = NULL 
      WHERE area IS NULL 
         OR TRIM(area::TEXT) = '' 
         OR area::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "area" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN area::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN area::NUMERIC 
        ELSE NULL 
      END
    `);

    // Handle approvalStatus for commercial_properties
    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    await queryInterface.sequelize.query('ALTER TABLE "commercial_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    await queryInterface.sequelize.query(`
      UPDATE commercial_properties 
      SET "commercialArea" = NULL 
      WHERE "commercialArea" IS NULL 
         OR TRIM("commercialArea"::TEXT) = '' 
         OR "commercialArea"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "commercial_properties" 
      ALTER COLUMN "commercialArea" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN "commercialArea"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "commercialArea"::NUMERIC 
        ELSE NULL 
      END
    `);

    // Update land_properties table
    await queryInterface.sequelize.query(`
      UPDATE land_properties 
      SET price = '0' 
      WHERE price IS NULL 
         OR TRIM(price::TEXT) = '' 
         OR price::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "land_properties" 
      ALTER COLUMN "price" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN price::NUMERIC 
        ELSE 0 
      END
    `);
    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "price" SET NOT NULL'
    );

    // Handle approvalStatus for land_properties
    await queryInterface.sequelize.query(`
      UPDATE land_properties 
      SET "approvalStatus" = 'pending' 
      WHERE "approvalStatus" IS NOT NULL 
        AND "approvalStatus" NOT IN ('pending', 'approved', 'rejected')
    `);
    await queryInterface.sequelize.query('ALTER TABLE "land_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT');
    await queryInterface.sequelize.query(`
      ALTER TABLE "land_properties" 
      ALTER COLUMN "approvalStatus" TYPE approval_status_enum 
      USING CASE 
        WHEN "approvalStatus" IN ('pending', 'approved', 'rejected') THEN "approvalStatus"::approval_status_enum
        ELSE 'pending'::approval_status_enum
      END
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "land_properties" 
      ALTER COLUMN "approvalStatus" SET DEFAULT 'pending'
    `);

    await queryInterface.sequelize.query(`
      UPDATE land_properties 
      SET "landArea" = NULL 
      WHERE "landArea" IS NULL 
         OR TRIM("landArea"::TEXT) = '' 
         OR "landArea"::TEXT !~ '^[0-9]+(\\.[0-9]+)?$'
    `);
    // Change column type with USING clause for explicit conversion
    await queryInterface.sequelize.query(`
      ALTER TABLE "land_properties" 
      ALTER COLUMN "landArea" TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN "landArea"::TEXT ~ '^[0-9]+(\\.[0-9]+)?$' THEN "landArea"::NUMERIC 
        ELSE NULL 
      END
    `);
  },

  async down(queryInterface, Sequelize) {
    // Revert changes - change back to original types
    // Update sale_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "bedrooms" TYPE VARCHAR USING "bedrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "bathrooms" TYPE VARCHAR USING "bathrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "area" TYPE VARCHAR USING "area"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "sale_properties" ALTER COLUMN "propertyAge" TYPE VARCHAR USING "propertyAge"::TEXT'
    );

    // Only revert maintenanceCharge if the column exists
    const [salePropertiesColumnsDown] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'sale_properties' 
      AND column_name = 'maintenanceCharge'
    `);
    
    if (salePropertiesColumnsDown.length > 0) {
      await queryInterface.sequelize.query(
        'ALTER TABLE "sale_properties" ALTER COLUMN "maintenanceCharge" TYPE VARCHAR USING "maintenanceCharge"::TEXT'
      );
    }

    // Update rent_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "bedrooms" TYPE VARCHAR USING "bedrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "bathrooms" TYPE VARCHAR USING "bathrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "area" TYPE VARCHAR USING "area"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "rent_properties" ALTER COLUMN "securityDeposit" TYPE VARCHAR USING "securityDeposit"::TEXT'
    );

    // Only revert maintenanceCharge if the column exists
    const [rentPropertiesColumnsDown] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'rent_properties' 
      AND column_name = 'maintenanceCharge'
    `);
    
    if (rentPropertiesColumnsDown.length > 0) {
      await queryInterface.sequelize.query(
        'ALTER TABLE "rent_properties" ALTER COLUMN "maintenanceCharge" TYPE VARCHAR USING "maintenanceCharge"::TEXT'
      );
    }

    // Update lease_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "bedrooms" TYPE VARCHAR USING "bedrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "bathrooms" TYPE VARCHAR USING "bathrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "area" TYPE VARCHAR USING "area"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "lease_properties" ALTER COLUMN "monthlyLeaseAmount" TYPE VARCHAR USING "monthlyLeaseAmount"::TEXT'
    );

    // Update pg_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "bedrooms" TYPE VARCHAR USING "bedrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "bathrooms" TYPE VARCHAR USING "bathrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "area" TYPE VARCHAR USING "area"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "pg_properties" ALTER COLUMN "occupancy" TYPE VARCHAR USING "occupancy"::TEXT'
    );

    // Update commercial_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "bedrooms" TYPE VARCHAR USING "bedrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "bathrooms" TYPE VARCHAR USING "bathrooms"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "area" TYPE VARCHAR USING "area"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "commercial_properties" ALTER COLUMN "commercialArea" TYPE VARCHAR USING "commercialArea"::TEXT'
    );

    // Update land_properties table
    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "price" DROP NOT NULL'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "price" TYPE VARCHAR USING "price"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "approvalStatus" DROP DEFAULT'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "approvalStatus" TYPE VARCHAR USING "approvalStatus"::TEXT'
    );

    await queryInterface.sequelize.query(
      'ALTER TABLE "land_properties" ALTER COLUMN "landArea" TYPE VARCHAR USING "landArea"::TEXT'
    );
  }
};