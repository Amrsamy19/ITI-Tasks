import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addFavourite,
  removeFavourite,
} from "../redux/store/slices/favouriteSlice";
import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { amber } from "@mui/material/colors";

export default function Movies() {
  const favorites = useSelector((state) => state.favourite.favouriteList);
  const actions = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ5OGRiN2RjNThhM2Q1YzRiYjVlOGFkMTdkOWYyZCIsIm5iZiI6MTY2NDA1MTI1NC4yOTcsInN1YiI6IjYzMmY2ODM2N2VjZDI4MDA3ZTA4MGQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1jP-j-mfmo6pqcovyBAlXzVP663pgrK_1a-1065-6Q0",
        },
      }
    );

    const movies = await response.json();
    setData(movies.results);
    setLoading(false);
  };

  const checkIfFavourite = (movie) => {
    return favorites.includes(movie);
  };

  const handleClick = (event, data) => {
    event.preventDefault();
    if (checkIfFavourite(data)) {
      actions(removeFavourite(data));
    } else {
      actions(addFavourite(data));
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: amber[600], fontWeight: "bold" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: amber[600], fontWeight: "bold" }}>
          Movies
        </Typography>
        <Typography variant="h6" sx={{ color: amber[600], fontWeight: "bold" }}>
          Favourites: <span>{favorites.length}</span>
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent={"center"}>
        {data.map((movie) => (
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "1rem",
            }}
          >
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="flex flex-col items-center text-center w-[200px] m-5 font-semibold hover:text-amber-500 hover:scale-105 transition duration-500"
            >
              <CardMedia
                component="img"
                height="300"
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
              />
              <CardContent
                width={200}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="p">{movie.title}</Typography>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      transform: "scale(1.2)",
                      transition: "transform 0.2s",
                    },
                  }}
                  color={checkIfFavourite(movie) ? "error" : "inherit"}
                  onClick={(event) => handleClick(event, movie)}
                >
                  <Favorite />
                </IconButton>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
