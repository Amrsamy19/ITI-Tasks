import { useState } from "react";
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
import { Provider } from "react-redux";

// Layout wrapper for protected routes
function ProtectedLayout({
  isAuthenticated,
  setIsAuthenticated,
  setUser,
  user,
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  store;
  return (
    <>
      <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
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
