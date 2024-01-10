import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";
import SmsService from "src/services/sms";

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

  customStoreRouter.post(
    "/send-otp",
    wrapHandler(async (req, res) => {
      const {
        body: { sendTo },
      } = req;
      const smsService: SmsService = req.scope.resolve("smsService");
      try {
        const response = await smsService.sendOTP(sendTo);
        res.send({
          status: true,
          data: response,
        });
      } catch (err) {
        res.send({
          status: false,
          message: err?.message || "Send OTP is unsuccessfull",
          error: err,
        });
      }
    })
  );
  customStoreRouter.post(
    "/verify-otp",
    wrapHandler(async (req, res) => {
      const {
        body: { sendTo, otp },
      } = req;
      const smsService: SmsService = req.scope.resolve("smsService");
      try {
        const response = await smsService.VerifyOTP({ sendTo, otp });
        res.send({
          status: true,
          data: response,
        });
      } catch (err) {
        res.send({
          status: false,
          message: err?.message || "Verification unsuccessfull",
          error: err,
        });
      }
    })
  );
}
