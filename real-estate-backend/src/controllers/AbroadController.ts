import { Request, Response } from 'express';
import { AbroadCountry } from '../models/AbroadCountry';
import { AbroadListing } from '../models/AbroadListing';
import "../models/associations";

// ============= COUNTRY CONTROLLERS =============

// Get all countries (only active ones for frontend)
export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active_only } = req.query;
    
    const whereClause = active_only === 'true' ? { is_active: true } : {};
    
    const countries = await AbroadCountry.findAll({
      where: whereClause,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching countries',
      error: (error as Error).message,
    });
  }
};

// Get country by ID with its listings
export const getCountryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const country = await AbroadCountry.findByPk(id);

    if (!country) {
      res.status(404).json({
        success: false,
        message: 'Country not found',
      });
      return;
    }

    res.json({
      success: true,
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching country',
      error: (error as Error).message,
    });
  }
};

// Create new country
export const createCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, is_active, display_order } = req.body;
    
    // Handle uploaded thumbnail image (Cloudinary)
    let thumbnail: string | undefined;
    if (req.file) {
      thumbnail = req.file.path;
    }

    const country = await AbroadCountry.create({
      name,
      description,
      thumbnail,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Country created successfully',
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating country',
      error: (error as Error).message,
    });
  }
};

// Update existing country
export const updateCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, is_active, display_order } = req.body;
    
    const country = await AbroadCountry.findByPk(id);

    if (!country) {
      res.status(404).json({
        success: false,
        message: 'Country not found',
      });
      return;
    }

    // Handle uploaded thumbnail image (Cloudinary)
    let thumbnail = country.thumbnail;
    if (req.file) {
      thumbnail = req.file.path;
    }

    await country.update({
      name,
      description,
      thumbnail,
      is_active,
      display_order,
    });

    res.json({
      success: true,
      message: 'Country updated successfully',
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating country',
      error: (error as Error).message,
    });
  }
};

// Delete country (cascades to listings)
export const deleteCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const country = await AbroadCountry.findByPk(id);

    if (!country) {
      res.status(404).json({
        success: false,
        message: 'Country not found',
      });
      return;
    }

    await country.destroy();

    res.json({
      success: true,
      message: 'Country deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting country',
      error: (error as Error).message,
    });
  }
};

// ============= LISTING CONTROLLERS =============

// Get all listings with optional country filter
export const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country_id, active_only } = req.query;
    
    const whereClause: any = {};
    if (country_id) {
      whereClause.country_id = country_id;
    }
    if (active_only === 'true') {
      whereClause.is_active = true;
    }
    
    const listings = await AbroadListing.findAll({
      where: whereClause,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching listings',
      error: (error as Error).message,
    });
  }
};

// Get all countries with their listings (for frontend display)
export const getCountriesWithListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active_only } = req.query;
    
    const countryWhere = active_only === 'true' ? { is_active: true } : {};
    
    const countries = await AbroadCountry.findAll({
      where: countryWhere,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
      include: [{
        model: AbroadListing,
        as: 'listings',
        where: { is_active: true },
        required: false,
        order: [['display_order', 'ASC']],
      }],
    });

    res.json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching countries and listings',
      error: (error as Error).message,
    });
  }
};

// Get single listing by ID
export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const listing = await AbroadListing.findByPk(id);

    if (!listing) {
      res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
      return;
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching listing',
      error: (error as Error).message,
    });
  }
};

// Create new listing
export const createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country_id, title, link, is_active, display_order } = req.body;
    
    // Handle uploaded image (Cloudinary)
    let image: string | undefined;
    if (req.file) {
      image = req.file.path;
    }

    const listing = await AbroadListing.create({
      country_id: parseInt(country_id),
      title,
      link,
      image,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating listing',
      error: (error as Error).message,
    });
  }
};

// Update existing listing
export const updateListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { country_id, title, link, is_active, display_order } = req.body;
    
    const listing = await AbroadListing.findByPk(id);

    if (!listing) {
      res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
      return;
    }

    // Handle uploaded image (Cloudinary)
    let image = listing.image;
    if (req.file) {
      image = req.file.path;
    }

    await listing.update({
      country_id: country_id ? parseInt(country_id) : listing.country_id,
      title,
      link,
      image,
      is_active,
      display_order,
    });

    res.json({
      success: true,
      message: 'Listing updated successfully',
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating listing',
      error: (error as Error).message,
    });
  }
};

// Delete listing
export const deleteListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const listing = await AbroadListing.findByPk(id);

    if (!listing) {
      res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
      return;
    }

    await listing.destroy();

    res.json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting listing',
      error: (error as Error).message,
    });
  }
};
