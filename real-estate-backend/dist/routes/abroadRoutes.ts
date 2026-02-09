import { Router } from 'express';
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getAllListings,
  getCountriesWithListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from '../controllers/AbroadController';
import { abroadUpload } from '../utils/abroadCloudinary';

const router = Router();

// Country routes
router.get('/countries', getAllCountries);
router.get('/countries/with-listings', getCountriesWithListings);
router.get('/countries/:id', getCountryById);
router.post('/countries', abroadUpload.single('thumbnail'), createCountry);
router.put('/countries/:id', abroadUpload.single('thumbnail'), updateCountry);
router.delete('/countries/:id', deleteCountry);

// Listing routes
router.get('/listings', getAllListings);
router.get('/listings/:id', getListingById);
router.post('/listings', abroadUpload.single('image'), createListing);
router.put('/listings/:id', abroadUpload.single('image'), updateListing);
router.delete('/listings/:id', deleteListing);

export default router;
