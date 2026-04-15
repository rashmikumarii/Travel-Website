import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    description: "",
    availableSlots: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  const fetchPackages = async () => {
    const res = await axios.get("http://localhost:5000/api/packages");
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("price", form.price);
    formData.append("duration", form.duration);
    formData.append("description", form.description);
    formData.append("availableSlots", form.availableSlots);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/packages/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Package updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/packages", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Package created successfully");
      }

      setEditingId(null);
      setForm({
        title: "",
        location: "",
        price: "",
        duration: "",
        description: "",
        availableSlots: "",
        image: null,
      });

      fetchPackages();
    } catch (error) {
      alert("Operation failed");
    }
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({ ...pkg, image: null });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/packages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPackages();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>

      {/* Create / Edit Form */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-10 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Package" : "Create New Package"}
        </h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />

          <input
            type="number"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />

          <input
            type="number"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Available Slots"
            value={form.availableSlots}
            onChange={(e) =>
              setForm({
                ...form,
                availableSlots: e.target.value,
              })
            }
            required
          />

          <input
            type="file"
            className="border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <textarea
            className="border rounded-lg px-4 py-2 md:col-span-2 focus:ring-2 focus:ring-emerald-400"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            {editingId ? "Update Package" : "Create Package"}
          </button>
        </form>
      </div>

      {/* Package List */}
      <h3 className="text-2xl font-semibold mb-6">Manage Packages</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {pkg.images?.length > 0 && (
              <img
                src={`http://localhost:5000${pkg.images[0]}`}
                alt={pkg.title}
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-5">
              <h4 className="text-lg font-semibold">{pkg.title}</h4>
              <p className="text-gray-500">{pkg.location}</p>
              <p className="text-emerald-600 font-bold mt-2">₹{pkg.price}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
