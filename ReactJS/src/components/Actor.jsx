import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Actor() {
  const { id } = useParams();
  const [actor, setActor] = useState({});
  const [knownFor, setKnownFor] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActorData = async () => {
    const response = await fetch(`http://localhost:3000/actors/${id}`);

    const data = await response.json();
    setActor(data);
    setKnownFor(data.known_for);
    setLoading(false);
  };

  useEffect(() => {
    getActorData();
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
      <h1 className="text-3xl text-amber-600 text-center font-bold">Actor</h1>
      <div className="flex flex-wrap justify-center">
        <div
          key={actor.id}
          className="flex items-center justify-center w-full gap-8 m-5"
        >
          <img
            src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
            alt={actor.name}
            className="w-[200px] h-[300px]"
          />
          <div className="flex flex-col items-start gap-7 ">
            <h3 className="text-2xl">{actor.name}</h3>
            <div>
              <p className="text-xl font-semibold">Known for:</p>
              <div className="flex gap-10">
                {knownFor.map((movie) => (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="h-[100px]"
                      src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                    />
                    <p className="" key={movie.id}>
                      {movie.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Actor;
