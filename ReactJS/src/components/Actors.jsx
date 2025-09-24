import { useEffect, useState } from "react";
import { useData } from "../context/dataContext";
import { Link } from "react-router-dom";

function Actors() {
  const { data, setData } = useData();
  const [loading, setLoading] = useState(true);

  const getActors = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/person/popular",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ5OGRiN2RjNThhM2Q1YzRiYjVlOGFkMTdkOWYyZCIsIm5iZiI6MTY2NDA1MTI1NC4yOTcsInN1YiI6IjYzMmY2ODM2N2VjZDI4MDA3ZTA4MGQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1jP-j-mfmo6pqcovyBAlXzVP663pgrK_1a-1065-6Q0",
        },
      }
    );

    const actors = await response.json();
    setData({ ...data, actors: actors.results });
    setLoading(false);
  };

  useEffect(() => {
    getActors();
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
