import { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

function Actors() {
  const { data, setData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((data) => setData({ ...data, actors: data }));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl text-amber-600 font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    data.actors && (
      <div className="flex flex-col flex-wrap justify-center">
        <div>
          <h1 className="text-3xl text-amber-600 text-center my-2 font-bold">
            Actors
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {data.actors.map((actor) => (
            <Link
              to={`/actors/${actor.id}`}
              key={actor.id}
              className="flex flex-col items-center text-center w-[200px] m-5 font-semibold hover:text-amber-500 hover:scale-105 transition duration-500"
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
                alt={actor.name}
                className="w-[200px] h-[300px]"
              />
              <h3>{actor.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}

export default Actors;
