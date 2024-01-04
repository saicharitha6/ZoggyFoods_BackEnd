import express, { Router } from "express";
import { errorHandler } from "@medusajs/medusa";
import pushNotificationController from "./push-notification";
export default (rootDirectory, options) => {
  const router = Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  pushNotificationController(router, options);

  router.use(errorHandler());

  return router;
};
