import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings",
        { packageId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!pkg) return <h3>Package not found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{pkg.title}</h1>
      {pkg.images && pkg.images.length > 0 && (
        <img
          src={`http://localhost:5000${pkg.images[0]}`}
          alt="package"
          width="300"
        />
      )}
      <p>
        <strong>Location:</strong> {pkg.location}
      </p>
      <p>
        <strong>Price:</strong> ₹{pkg.price}
      </p>
      <p>
        <strong>Duration:</strong> {pkg.duration}
      </p>
      <p>
        <strong>Available Slots:</strong> {pkg.availableSlots}
      </p>
      <p>{pkg.description}</p>

      <button
        onClick={handleBooking}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Book Now
      </button>
    </div>
  );
};

export default PackageDetails;
