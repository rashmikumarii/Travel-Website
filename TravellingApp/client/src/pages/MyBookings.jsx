import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings");
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            // 🔥 Handle deleted package safely
            if (!booking.package) {
              return (
                <div
                  key={booking._id}
                  className="bg-red-100 border border-red-300 p-6 rounded-xl"
                >
                  <p className="text-red-600 font-semibold">
                    This package was removed by admin.
                  </p>
                  <p>Status: {booking.status}</p>
                </div>
              );
            }

            return (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">
                  {booking.package.title}
                </h3>

                <p className="text-gray-500">{booking.package.location}</p>

                <p className="text-emerald-600 font-bold mt-2">
                  ₹{booking.package.price}
                </p>

                <p className="mt-3">
                  <span className="font-medium">Status:</span> {booking.status}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
