import Link from "next/link";
import React from "react";

const Movies = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-6">
          <Link
            href="/movies/1"
            className="col-span-1 border-2 border-black p-2 w-fit"
          >
            <h1 className="text-2xl">First</h1>
          </Link>
          <Link
            href="/movies/2"
            className="col-span-1 border-2 border-black p-2 w-fit"
          >
            <h1 className="text-2xl">Second</h1>
          </Link>
          <Link
            href="/movies/3"
            className="col-span-1 border-2 border-black p-2 w-fit"
          >
            <h1 className="text-2xl">Third</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Movies;
