import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { amber } from "@mui/material/colors";

function Actor() {
  const { id } = useParams();
  const [actor, setActor] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);

  const getActorData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/person/" + id + "?language=en-U",
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
    setActor(data);
    setLoading(false);
  };

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    getActorData();
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
        Actor
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          key={actor.id}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            margin: "2rem",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
            alt={actor.name}
            className="w-[300px] h-[400px]"
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
              {actor.name}
            </Typography>
            <Box>
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Born:
              </Typography>
              <Typography
                variant="span"
                sx={{ display: "block", fontSize: "1.1rem" }}
              >
                {actor.birthday}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Place of Birth:
              </Typography>
              <Typography
                variant="span"
                sx={{ display: "block", fontSize: "1.1rem" }}
              >
                {actor.place_of_birth}
              </Typography>
            </Box>
            <Box
              sx={{ display: actor.biography ? "" : "hidden", height: "100px" }}
            >
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Biography:
              </Typography>
              <Box>
                <Typography
                  variant="span"
                  sx={{ fontSize: "1.1rem" }}
                  className={`${show ? "line-clamp-1 break-words" : ""}`}
                >
                  {actor.biography}
                </Typography>
              </Box>
              <Button
                variant="text"
                onClick={handleClick}
                sx={{ color: amber[800], textDecoration: "underline" }}
              >
                {show ? "Read More" : "Read Less"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Actor;
