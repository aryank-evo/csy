import { Request, Response } from 'express';
import { Property } from '../models/Property';
import { AuthRequest } from '../middleware/authMiddleware';

export const createProperty = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, location, address, city, state, zipCode, country, 
      propertyType, propertyStatus, bedrooms, bathrooms, area, amenities } = req.body;
    
    // Create new property
    const newProperty = await Property.create({
      title: String(title),
      description: String(description),
      price: typeof price === 'string' ? parseFloat(price) : Number(price),
      location: String(location),
      address: address ? String(address) : null,
      city: city ? String(city) : null,
      state: state ? String(state) : null,
      zipCode: zipCode ? String(zipCode) : null,
      country: country ? String(country) : null,
      propertyType: propertyType ? String(propertyType) : null,
      propertyStatus: propertyStatus ? String(propertyStatus) : null,
      bedrooms: bedrooms ? parseInt(String(bedrooms)) : null,
      bathrooms: bathrooms ? parseInt(String(bathrooms)) : null,
      area: area ? parseInt(String(area)) : null,
      amenities: amenities ? String(amenities) : null,
      userId: req.user.id, // Associate with authenticated user
    } as any); // Type assertion to bypass strict typing issues

    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Server error while creating property' });
  }
};

export const getUserProperties = async (req: AuthRequest, res: Response) => {
  try {
    const properties = await Property.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.findAll({
      where: { approvalStatus: 'approved' },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
};