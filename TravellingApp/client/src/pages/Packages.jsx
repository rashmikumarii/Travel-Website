import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const res = await axios.get("http://localhost:5000/api/packages");
      setPackages(res.data);
    };
    fetchPackages();
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Travel Packages</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {pkg.images?.length > 0 && (
              <img
                src={`http://localhost:5000${pkg.images[0]}`}
                alt={pkg.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-5">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <p className="text-gray-500">{pkg.location}</p>
              <p className="text-emerald-600 font-bold mt-2">₹{pkg.price}</p>

              <Link
                to={`/packages/${pkg._id}`}
                className="inline-block mt-4 bg-emerald-500 px-4 py-2 rounded text-white hover:bg-emerald-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
