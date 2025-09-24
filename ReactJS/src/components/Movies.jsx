import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const { data, setData } = useContext(DataContext);

  const getMovies = async () => {
    const response = await fetch("http://localhost:3000/movies");

    const movies = await response.json();
    setData({ ...data, movies: movies });
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
            to={`/${movie.id}`}
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
