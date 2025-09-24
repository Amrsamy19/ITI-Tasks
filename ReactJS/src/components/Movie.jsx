import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl text-amber-600 font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-6">
      <h1 className="text-3xl text-amber-600 text-center font-bold">Movie</h1>
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center w-[200px] font-semibold ">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            className="w-[200px] h-[300px]"
          />
        </div>
        <div className="flex flex-col items-start gap-7 ">
          <h3 className="text-2xl">{movie.name}</h3>
          <div>
            <span className="font-bold">Overview: </span>
            <p className="w-[600px]">{movie.overview}</p>
          </div>
          <div>
            <span className="font-bold">Rating: </span>
            <p>{rating}/10</p>
          </div>
          <div>
            <span className="font-bold">Genre:</span>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
