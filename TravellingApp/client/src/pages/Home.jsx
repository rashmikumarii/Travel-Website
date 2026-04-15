import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center h-[70vh] flex items-center justify-center">
        <div className="bg-black/60 p-10 rounded-xl text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Explore The World With Us</h1>
          <p className="mb-6">Discover unforgettable travel experiences.</p>
          <Link
            to="/packages"
            className="bg-emerald-500 px-6 py-3 rounded text-white hover:bg-emerald-600"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
