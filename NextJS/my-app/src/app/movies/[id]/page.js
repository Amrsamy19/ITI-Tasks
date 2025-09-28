"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { fetchMovieById } from "@/lib/features/movies/moviesSlice";
import Image from "next/image";

const Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    current && (
      <>
        <div className="flex justify-center">
          <h1 className="text-2xl text-[#FE7F2D] font-extrabold mb-5">
            {current.name}
          </h1>
        </div>
        <div className="flex justify-center gap-6">
          <Image
            src={current.image.original}
            width={300}
            height={300}
            alt={current.name}
          />
          <div className="w-1/2">
            <div className="flex flex-col gap-3">
              <span className="font-bold">Summary:</span>
              <p>{current.summary.replace(/<[^>]+>/g, "")}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Movie;
