import express, { Router } from "express";
import { errorHandler } from "@medusajs/medusa";
import pushNotificationController from "./push-notification";
import bodyParser from "body-parser";
import customRegionController from './custom-region';
import updateOrderController from './update-order';

const multer = require("multer");
const upload = multer();

export default (rootDirectory, options) => {
  const router = Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.use(upload.array());
  pushNotificationController(router, options);
  customRegionController(router, options);
  updateOrderController(router, options);

  router.use(errorHandler());

  return router;
};
