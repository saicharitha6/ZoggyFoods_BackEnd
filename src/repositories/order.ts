import { Order } from '../models/Order';
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

// Ensure that `dataSource.getRepository` is correctly initialized
// and configured to provide access to `DeliveryLocationRepository`.
export const OrderRepository = dataSource.getRepository(Order);

export default OrderRepository;