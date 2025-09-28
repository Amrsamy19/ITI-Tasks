"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../lib/features/movies/moviesSlice";
import Link from "next/link";
import Image from "next/image";

const Movies = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div>
      <ul className="grid grid-cols-4 gap-4">
        {data.slice(0, 10).map((movie) => (
          <li
            className="flex flex-col justify-center items-center"
            key={movie.id}
          >
            <Link
              href={`/movies/${movie.id}`}
              className="text-[#233d4d] hover:text-[#FE7F2D] hover:scale-105 transition duration-300"
            >
              <Image
                src={movie.image.medium}
                alt={movie.name}
                width={200}
                height={200}
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-bold">{movie.name}</p>
                <p className="text-lg">{movie.rating.average}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
