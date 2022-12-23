import express from "express";
import * as controller from "../controller/photoController.js";

const router = express.Router();

router
  .get("/", controller.getAllPhotos)
  .get("/:id", controller.getPhoto)
  .post("/", controller.savePhoto)
  .put("/:id", controller.editPhoto)
  .delete("/:id", controller.deletePhoto);

export default router;
