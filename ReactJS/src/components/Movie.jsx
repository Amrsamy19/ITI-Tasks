import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);

  const getMovieData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ5OGRiN2RjNThhM2Q1YzRiYjVlOGFkMTdkOWYyZCIsIm5iZiI6MTY2NDA1MTI1NC4yOTcsInN1YiI6IjYzMmY2ODM2N2VjZDI4MDA3ZTA4MGQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1jP-j-mfmo6pqcovyBAlXzVP663pgrK_1a-1065-6Q0",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setMovie(data);
    setRating(data.vote_average);
    setLoading(false);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        height={"h-screen"}
      >
        <Typography variant="h4" sx={{ color: amber[600], fontWeight: "bold" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: amber[600], fontWeight: "bold", textAlign: "center" }}
      >
        Movie
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
          alt={movie.title}
          className="w-[200px] h-[300px]"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {movie.title}
          </Typography>
          <Box>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Overview:
            </Typography>
            <Typography
              variant="span"
              sx={{ display: "block", width: "600px" }}
            >
              {movie.overview}
            </Typography>
          </Box>
          <Box>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Rating:
            </Typography>
            <Typography variant="span" sx={{ display: "block" }}>
              {rating}/10
            </Typography>
          </Box>
          <Box>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Genre:
            </Typography>
            <Typography variant="span" sx={{ display: "block" }}>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Movie;
