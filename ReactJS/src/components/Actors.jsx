import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Actors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActors = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/person/popular",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ5OGRiN2RjNThhM2Q1YzRiYjVlOGFkMTdkOWYyZCIsIm5iZiI6MTY2NDA1MTI1NC4yOTcsInN1YiI6IjYzMmY2ODM2N2VjZDI4MDA3ZTA4MGQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1jP-j-mfmo6pqcovyBAlXzVP663pgrK_1a-1065-6Q0",
        },
      }
    );

    const actors = await response.json();
    setData(actors.results);
    setLoading(false);
  };

  useEffect(() => {
    getActors();
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
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: amber[600], fontWeight: "bold" }}>
          Actors
        </Typography>
      </Box>
      <Grid container justifyContent={"center"} spacing={2}>
        {data.map((actor) => (
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "1rem",
            }}
          >
            <Link
              to={`/actors/${actor.id}`}
              key={actor.id}
              className="flex flex-col items-center text-center w-[200px] m-5 font-semibold hover:text-amber-500 hover:scale-105 transition duration-500"
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
                alt={actor.name}
                title={actor.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{actor.name}</Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

export default Actors;
