import Booking from "../models/Booking.js";
import Package from "../models/Package.js";

//  Create Booking (User)
export const createBooking = async (req, res) => {
  try {
    const { packageId } = req.body;

    const packageItem = await Package.findById(packageId);

    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (packageItem.availableSlots <= 0) {
      return res.status(400).json({ message: "No slots available" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      package: packageId,
      paymentStatus: "pending",
    });

    // Reduce available slots
    packageItem.availableSlots -= 1;
    await packageItem.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Logged-in User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "package",
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("package");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
