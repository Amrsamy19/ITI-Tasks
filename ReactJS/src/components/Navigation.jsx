import { NavLink, Link } from "react-router-dom";
import { useData } from "../context/dataContext";

function Navigation() {
  const { data } = useData();
  return (
    <nav className="flex justify-around items-center w-full bg-amber-500 text-amber-50 p-4">
      <Link to="/movies" className="text-2xl font-bold">
        Moviey
      </Link>
      <div className="flex gap-16 font-semibold">
        {data.user && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
                  : "hover:text-amber-600 hover:bg-amber-50 p-2 rounded-2xl transition duration-500"
              }
              to={"/movies"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
                  : "hover:text-amber-600 hover:bg-amber-50 p-2 rounded-2xl transition duration-500"
              }
              to={"/actors"}
            >
              Actors
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
                  : "hover:text-amber-600 hover:bg-amber-50 p-2 rounded-2xl transition duration-500"
              }
              to={"/profile"}
            >
              Profile
            </NavLink>
          </>
        )}
        <Link
          className="text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
          to={"/login"}
        >
          {data.user ? "Logout" : "Login"}
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
