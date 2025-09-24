import { useState, useEffect } from "react";
import { useData } from "../context/dataContext";
import { Link } from "react-router-dom";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const { data, setData } = useData();

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
    setData({ ...data, movies: movies.results });
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl text-amber-600 font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="text-3xl text-amber-600 text-center my-2 font-bold">
        Movies
      </h1>

      <div className="flex flex-wrap justify-center">
        {data.movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="flex flex-col items-center text-center w-[200px] m-5 font-semibold hover:text-amber-500 hover:scale-105 transition duration-500"
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
              className="w-[200px] h-[300px]"
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
