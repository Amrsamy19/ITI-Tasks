import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartModel from "./CartModel";
import Toggle from "./Toggle";
import i18next from "i18next";

function Navigation({ setIsAuthenticated, setUser }) {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const handleCartModel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-b-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex ${
            i18next.language === "ar" && "direction-rtl"
          } justify-between items-center h-16`}
        >
          <h1 className="text-xl font-semibold text-gray-900">Bookys</h1>
          <div
            className={`flex ${
              i18next.language === "ar" ? "font-medium font-sans" : "font-bold"
            } justify-center items-center gap-8`}
          >
            <Toggle />
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-gray-900 transform scale-110"
                    : "text-gray-500"
                } text-lg hover:text-gray-900 transition duration-300`
              }
            >
              {t("nav.books")}
            </NavLink>
            {user.role === "admin" && (
              <NavLink
                to={"/users"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gray-900 transform scale-110"
                      : "text-gray-500"
                  } text-lg hover:text-gray-900 transition duration-300`
                }
              >
                {t("nav.users")}
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
                  } text-lg hover:text-gray-900 transition duration-300`
                }
              >
                {t("nav.myBooks")}
              </NavLink>
            )}
            <button
              className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Cart"
              onClick={handleCartModel}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="absolute inset-0 object-right-top -mr-6">
                <div className="inline-flex items-center px-1.5 py-1 rounded-full text-xs leading-4 bg-red-500 text-white font-bold">
                  {cart.books ? cart.books.length : 0}
                </div>
              </span>
            </button>
            {isOpen && <CartModel setIsOpen={setIsOpen} />}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              {t("nav.logout")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
