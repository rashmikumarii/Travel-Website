import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
} from "../controllers/bookingController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);

// Admin Route
router.get("/", protect, admin, getAllBookings);

export default router;
