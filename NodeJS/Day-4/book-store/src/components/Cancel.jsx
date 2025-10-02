import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">
        You have cancelled the payment
      </h1>
      <Link
        to={"/dashboard"}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to the dashboard
      </Link>
    </div>
  );
};

export default Cancel;
