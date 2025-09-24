import { useRouteError } from "react-router-dom";
function NotFound() {
  const error = useRouteError();
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl text-amber-600 font-bold">{error.message}</h1>
    </div>
  );
}

export default NotFound;
