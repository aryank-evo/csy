import { Router, Response } from "express";
import { User } from "../models/User"; 
import { Property } from "../models/Property";
import { Lead } from "../models/Lead";
import { authenticateUser, AuthRequest } from "../middleware/authMiddleware"; 
import { getUserProperties } from "../controllers/PropertyController";
import { Op } from 'sequelize';

const router = Router();

router.get("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["name", "email", "firstName", "lastName", "phoneNumber", "about"]
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.put("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { firstName, lastName, phoneNumber, about } = req.body;

    if (!firstName || !lastName || !phoneNumber || !about) {
      res.status(400).json({ error: "All fields are required" }); 
      return;
    }

    await User.update(
      { firstName, lastName, phoneNumber, about },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get property details with lead access check
router.get("/properties/:id", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Get the property
    const property = await Property.findByPk(id);
    
    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    
    // Check if property is approved
    if (property.approvalStatus !== "approved") {
      res.status(404).json({ message: "Property not found" }); // Don't reveal pending/rejected properties
      return;
    }
    
    // Check if user has submitted lead for this property
    const lead = await Lead.findOne({
      where: {
        propertyId: parseInt(id),
        userId: req.user.id
      }
    });
    
    // If user hasn't submitted lead, hide contact information
    if (!lead) {
      // Return property without owner contact info
      const { createdAt, updatedAt, ...propertyData } = property.toJSON();
      // Omit sensitive contact fields if no lead submitted
      res.json({
        ...propertyData,
        contactInfoHidden: true,
        message: "Submit lead form to view contact information"
      });
    } else {
      // User has submitted lead, return full property details
      res.json(property);
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error while fetching property" });
  }
});

// Create new property route moved to public routes
// router.post("/properties", authenticateUser, createProperty);

// Get user's properties
router.get("/my-properties", authenticateUser, getUserProperties);

// Get all properties (filtered by approval status)
router.get("/properties", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const properties = await Property.findAll({
      where: { approvalStatus: "approved" },
      order: [["createdAt", "DESC"]]
    });
    
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error while fetching properties" });
  }
});

export default router;