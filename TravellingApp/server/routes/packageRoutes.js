import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getPackages);
router.get("/:id", getPackageById);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  upload.single("image"), // 🔥 multer must be here
  createPackage,
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"), // 🔥 also needed for update
  updatePackage,
);

router.delete("/:id", protect, admin, deletePackage);

export default router;
