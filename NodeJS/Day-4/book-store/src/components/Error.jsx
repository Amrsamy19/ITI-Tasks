import React from "react";

function Error({ error }) {
  return (
    <div className="z-20 w-screen h-screen bg-blue-400/30 fixed top-0 right-0 flex justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
    </div>
  );
}

export default Error;
