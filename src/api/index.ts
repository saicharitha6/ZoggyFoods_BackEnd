import express, { Router } from "express";
import { errorHandler } from "@medusajs/medusa";
import pushNotificationController from "./push-notification";
import twilioSmsController from "./twilio-sms";
import bodyParser from "body-parser";
import customRegionController from './custom-region';

const multer = require("multer");
const upload = multer();

export default (rootDirectory, options) => {
  const router = Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.use(upload.array());
  pushNotificationController(router, options);
  twilioSmsController(router, options);
  customRegionController(router, options);

  router.use(errorHandler());

  return router;
};
