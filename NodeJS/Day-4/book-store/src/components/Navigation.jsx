import { useNavigate, NavLink } from "react-router-dom";

function Navigation({ setIsAuthenticated, setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-b-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-900">Bookys</h1>
          <div className="flex justify-center items-center gap-4">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-gray-900 transform scale-110"
                    : "text-gray-500"
                } text-lg font-medium hover:text-gray-900 transition duration-300`
              }
            >
              Books
            </NavLink>
            {user.role === "admin" && (
              <NavLink
                to={"/users"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gray-900 transform scale-110"
                      : "text-gray-500"
                  } text-lg font-medium hover:text-gray-900 transition duration-300`
                }
              >
                Users
              </NavLink>
            )}

            {(user.role === "admin" || user.role === "owner") && (
              <NavLink
                to={"/my-books"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gray-900 transform scale-110"
                      : "text-gray-500"
                  } text-lg font-medium hover:text-gray-900 transition duration-300`
                }
              >
                My Books
              </NavLink>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
