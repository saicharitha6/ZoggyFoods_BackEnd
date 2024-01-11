import { wrapHandler } from "@medusajs/medusa";
import { query, Router } from "express";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";
import CustomStoreService from "src/services/custom-store";

export default function customStoreController(
  router: Router,
  options: ConfigModule
) {
  const { projectConfig } = options;
  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };
  const customStoreRouter = Router();
  router.use("/store", customStoreRouter);

  customStoreRouter.use(cors(corsOptions));

  customStoreRouter.get(
    "/customers/phone/:phone",
    wrapHandler(async (req, res) => {
      const {
        params: { phone },
      } = req;
      const customStoreService: CustomStoreService =
        req.scope.resolve("customStoreService");
      try {
        const customer = await customStoreService.retrieveByPhone(phone);
        if (customer) {
          res.send({
            status: true,
            customer,
          });
        } else {
          res.send({
            status: false,
            message: "Phone number is not registed",
          });
        }
      } catch (err) {
        res.send({
          status: false,
          message: err?.message || "Phone number is not registed",
          error: err,
        });
      }
    })
  );
}
