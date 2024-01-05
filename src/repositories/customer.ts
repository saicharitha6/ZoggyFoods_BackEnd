import { Customer } from '../models/Customer';
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

// Ensure that `dataSource.getRepository` is correctly initialized
// and configured to provide access to `DeliveryLocationRepository`.
export const CustomerRepository = dataSource.getRepository(Customer);

export default CustomerRepository;