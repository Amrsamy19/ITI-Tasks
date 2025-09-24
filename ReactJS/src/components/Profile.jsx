import { useData } from "../context/dataContext";

const Profile = () => {
  const { data } = useData();
  return (
    <div className="flex flex-col justify-center items-center gap-8 h-screen bg-amber-300/15">
      <h1 className="text-3xl text-amber-600 font-bold">Profile</h1>
      <div>
        <p className="font-bold">
          Username: <span className="text-amber-600">{data.user.username}</span>
        </p>
      </div>
      <div>
        <p className="font-bold">
          Name: <span className="text-amber-600">{data.user.name}</span>
        </p>
      </div>
      <div>
        <p className="font-bold">
          Gender: <span className="text-amber-600">{data.user.gender}</span>
        </p>
      </div>
      <div>
        <p className="font-bold">
          Genres:{" "}
          <span className="text-amber-600">{data.user.genres.join(" | ")}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
