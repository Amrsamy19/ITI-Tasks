"use client";
import { useParams } from "next/navigation";
import React from "react";

const Movie = () => {
  const { id } = useParams();
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-2xl text-[#FE7F2D] font-extrabold">Movie {id}</h1>
      </div>
    </>
  );
};

export default Movie;
