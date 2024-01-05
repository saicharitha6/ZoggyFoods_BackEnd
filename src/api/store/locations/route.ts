import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import { DeliveryLocationRepository } from '../../../repositories/delivery_location';
import { DeliveryLocation } from "../../../models/DeliveryLocation";
  
  export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const locations = await DeliveryLocationRepository.createQueryBuilder("DeliveryLocation")
    .select([
        "DeliveryLocation.id",
        "DeliveryLocation.pincode",
        "DeliveryLocation.area",
        "DeliveryLocation.is_deliverable",
    ])
    .getRawMany();

      res.json({
      locations,
    })
  }
  
  export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    try {
      const { locationId, selectedArea } = req.body; // Assuming you receive locationId and newArea in the request body
      const locationUpdated = await DeliveryLocationRepository
      .createQueryBuilder()
      .update(DeliveryLocation)
      .set({ is_deliverable: selectedArea })
      .where("id = :id", { id: locationId })
      .execute();

      res.json({
        message: `Location ${locationId} updated : `,
      });
    } catch (error) {
      console.error('Error updating location:', error);
      res.status(500).json({ error: 'Error updating location' , errwor:error});
    }
  }