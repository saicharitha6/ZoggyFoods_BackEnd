import { DeliveryLocation } from '../models/DeliveryLocation';
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

// Ensure that `dataSource.getRepository` is correctly initialized
// and configured to provide access to `DeliveryLocationRepository`.
export const DeliveryLocationRepository = dataSource.getRepository(DeliveryLocation);

export default DeliveryLocationRepository;