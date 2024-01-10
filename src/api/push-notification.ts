import { authenticate, wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import PushNotificationService from "src/services/push-notification";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";

export default function pushNotificationController(
  router: Router,
  options: ConfigModule
) {
  const { projectConfig } = options;
  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };
  const pushNotificationRouter = Router();
  router.use("/admin/notification", pushNotificationRouter);

  pushNotificationRouter.use(cors(corsOptions));
  pushNotificationRouter.use(authenticate());

  // test endpoint
  pushNotificationRouter.get(
    "/health",
    wrapHandler(async (req, res) => {
      const pushNotificationService: PushNotificationService =
        req.scope.resolve("pushNotificationService");
      const status = pushNotificationService.getMessage();
      res.send(status);
    })
  );
  // Create push notification
  pushNotificationRouter.post(
    "/",
    wrapHandler(async (req, res) => {
      const { body } = req;
      if (body?.title.length > 0 && body?.message.length > 0) {
        const pushNotificationService: PushNotificationService =
          req.scope.resolve("pushNotificationService");
        const customers = await pushNotificationService.getCustomers();
        const tickets = await pushNotificationService.sendPushNotification(
          customers,
          body
        );
        res.send({
          status: true,
          message: "Successfully notified",
          tickets,
        });
      } else {
        res.statusCode = 400;
        res.send({
          status: false,
          message: "title and message should not be empty",
        });
      }
    })
  );
}
