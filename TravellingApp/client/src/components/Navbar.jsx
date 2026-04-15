import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-emerald-400">TravelGo</h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-emerald-400">
          Home
        </Link>
        <Link to="/packages" className="hover:text-emerald-400">
          Packages
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-emerald-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-emerald-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/my-bookings" className="hover:text-emerald-400">
              My Bookings
            </Link>

            {user?.role === "admin" && (
              <Link to="/admin-dashboard" className="hover:text-emerald-400">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
