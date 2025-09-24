import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Actors from "./components/Actors";
import Actor from "./components/Actor";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { DataProvider } from "./context/dataContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Movies />,
        },
        {
          path: "/:id",
          element: <Movie />,
        },
        {
          path: "/actors",
          element: <Actors />,
        },
        {
          path: "/actors/:id",
          element: <Actor />,
        },
      ],
    },
  ]);

  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </>
  );
}

export default App;
