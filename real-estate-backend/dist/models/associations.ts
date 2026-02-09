import { AbroadCountry } from './AbroadCountry';
import { AbroadListing } from './AbroadListing';

// Set up associations
AbroadCountry.hasMany(AbroadListing, {
  foreignKey: 'country_id',
  as: 'listings',
  onDelete: 'CASCADE',
});

AbroadListing.belongsTo(AbroadCountry, {
  foreignKey: 'country_id',
  as: 'country',
});