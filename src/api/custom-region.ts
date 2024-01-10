import { authenticate, wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";
import { Customer } from "../models/Customer";
import { CustomerRepository } from '../repositories/customer';

export default function customRegionController(
  router: Router,
  options: ConfigModule
) {
  const { projectConfig } = options;
  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };
  const customRegionRouter = Router();
  router.use("/store/custom-region", customRegionRouter);

  customRegionRouter.use(cors(corsOptions));
  customRegionRouter.use(authenticate());


  // Create push notification
  customRegionRouter.post(
    "/",
    wrapHandler(async (req, res) => {
      try {
        const { customerId, dlId } = req.body;
        const locationUpdated = await CustomerRepository
          .createQueryBuilder()
          .update(Customer)
          .set({ dl_id: dlId })
          .where("id = :id", { id: customerId })
          .execute();
    
        res.json({
          locationUpdated,
        })
      } catch (error) {
        console.error('Error updating customer region:', error);
        res.status(500).json({ error: 'Error customer region', errwor: error });
      }
    })
  );
}
