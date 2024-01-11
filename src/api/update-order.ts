import { authenticate, wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";
import { Order } from "../models/Order";
import { OrderRepository } from '../repositories/order';

export default function updateOrderController(
  router: Router,
  options: ConfigModule
) {
  const { projectConfig } = options;
  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };
  const updateOrderRouter = Router();
  router.use("/store/orders", updateOrderRouter);

  updateOrderRouter.use(cors(corsOptions));
  // updateOrderRouter.use(authenticate());


  // Create push notification
  updateOrderRouter.post(
    "/:id",
    wrapHandler(async (req, res) => {
      try {
        const orderId = req.params.id; 
        const { deliveryDate } = req.body;
        const locationUpdated = await OrderRepository
          .createQueryBuilder()
          .update(Order)
          .set({ delivery_date: deliveryDate })
          .where("id = :id", { id: orderId })
          .execute();
    
        res.json({
          locationUpdated,
        })
      } catch (error) {
        console.error('Error updating order delivery date:', error);
        res.status(500).json({ error: 'Error order delivery date', errorMessage: error });
      }
    })
  );
}
