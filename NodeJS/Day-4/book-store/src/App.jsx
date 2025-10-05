import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import store from "./redux/store";
import BookDetails from "./components/BookDetails";
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import MyBooks from "./components/MyBooks";
import Notification from "./components/Notification";
import { Provider, useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./redux/store/slices/booksSlice";
import { clearCartMessage } from "./redux/store/slices/cartSlice";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import "./i18n";

function ProtectedLayout({
  isAuthenticated,
  setIsAuthenticated,
  setUser,
  user,
}) {
  const { message: bookMessage, error } = useSelector((state) => state.books);
  const { message: cartMessage } = useSelector((state) => state.cart);
  const action = useDispatch();

  useEffect(() => {
    if (bookMessage || error || cartMessage) {
      const timer = setTimeout(() => {
        action(clearMessage()); // books
        action(clearCartMessage()); // cart
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartMessage, action, bookMessage, error]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      {(bookMessage || cartMessage) && (
        <Notification message={bookMessage || cartMessage} type="success" />
      )}
      <Outlet context={{ user, setIsAuthenticated, setUser }} />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const router = createBrowserRouter([
    {
      path: "/login",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      ),
    },
    {
      path: "/register",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Register />
      ),
    },
    {
      element: (
        <ProtectedLayout
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          setUser={setUser}
          user={user}
        />
      ),
      children: [
        {
          path: "/dashboard",
          element: (
            <Dashboard
              user={user}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          ),
        },
        {
          path: "/book/:id",
          element: <BookDetails />,
        },
        {
          path: "/my-books",
          element: <MyBooks />,
        },
        {
          path: "/users",
          element: <Users user={user} />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/cancel",
          element: <Cancel />,
        },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
