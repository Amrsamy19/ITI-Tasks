import { Box } from "@mui/material";
import { amber } from "@mui/material/colors";
import { NavLink, Link } from "react-router-dom";

function Navigation() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: amber[700],
        color: amber[50],
        padding: 2,
      }}
    >
      <Link to="/movies" className="text-2xl font-bold">
        Moviey
      </Link>
      <Box className="flex gap-16 font-semibold">
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
        {/* <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
              : "hover:text-amber-600 hover:bg-amber-50 p-2 rounded-2xl transition duration-500"
          }
          to={"/profile"}
        >
          Profile
        </NavLink> */}
        {/* 
        <Link
          className="text-amber-600 bg-amber-50 p-2 rounded-2xl transition duration-200"
          to={"/login"}
        >
          {"Login"}
        </Link> */}
      </Box>
    </Box>
  );
}

export default Navigation;
