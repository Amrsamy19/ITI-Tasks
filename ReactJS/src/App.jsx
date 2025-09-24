import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Actors from "./components/Actors";
import Actor from "./components/Actor";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { DataProvider } from "./context/dataContext";
import { ThemeProvider, createTheme } from "@mui/material";
import Profile from "./components/Profile";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#e68f0d",
        secondary: "#FFEB3B",
        contrastText: "#fff",
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "movies",
              element: <Movies />,
            },
            {
              path: "movies/:id",
              element: <Movie />,
            },
            {
              path: "actors",
              element: <Actors />,
            },
            {
              path: "actors/:id",
              element: <Actor />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
