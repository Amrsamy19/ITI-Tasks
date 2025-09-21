import { useNavigate, Link } from "react-router-dom";

function Navigation({ setIsAuthenticated, setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isActive = (path) => window.location.pathname === path;

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
            {user.role === "admin" && (
              <Link
                to={isActive("/users") ? "/dashboard" : `/users`}
                className={`text-lg font-medium text-gray-900 hover:text-gray-900 transition duration-200`}
              >
                {isActive("/users") ? "Dashboard" : "Users"}
              </Link>
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
