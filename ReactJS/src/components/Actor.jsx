import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Actor() {
  const { id } = useParams();
  const [actor, setActor] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);

  const getActorData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/person/" + id + "?language=en-U",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ5OGRiN2RjNThhM2Q1YzRiYjVlOGFkMTdkOWYyZCIsIm5iZiI6MTY2NDA1MTI1NC4yOTcsInN1YiI6IjYzMmY2ODM2N2VjZDI4MDA3ZTA4MGQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1jP-j-mfmo6pqcovyBAlXzVP663pgrK_1a-1065-6Q0",
        },
      }
    );

    const data = await response.json();
    setActor(data);
    console.log(data);
    setLoading(false);
  };

  const handleClick = () => {
    setShow(!show);
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
    <div className="flex flex-col items-center justify-center mt-6">
      <h1 className="text-3xl text-amber-600 text-center font-bold">Actor</h1>
      <div className="flex flex-wrap items-center justify-center w-[1000px]">
        <div
          key={actor.id}
          className="flex items-center justify-center w-full gap-8 m-5"
        >
          <img
            src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
            alt={actor.name}
            className="w-[300px] h-[400px]"
          />
          <div className="flex flex-col items-start gap-7 ">
            <h3 className="text-2xl">{actor.name}</h3>
            <div>
              <span className="text-xl font-semibold">Born: </span>
              <p className="text-lg">{actor.birthday}</p>
            </div>
            <div>
              <span className="text-xl font-semibold">Place of Birth: </span>
              <p className="text-lg">{actor.place_of_birth}</p>
            </div>
            <div className={`${actor.biography ? "" : "hidden"} h-[100px]`}>
              <span className="text-xl font-semibold">Biography:</span>
              <p
                className={`${show ? "line-clamp-1 break-words" : ""} text-lg`}
              >
                {actor.biography}
              </p>
              <button
                onClick={handleClick}
                className="text-amber-600 underline cursor-pointer"
              >
                {show ? "Read More" : "Read Less"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Actor;
