import { useEffect, useDispatch } from "react";
import { Link } from "react-router-dom";
import { deleteCart } from "../redux/store/slices/cartSlice";
import { useSelector } from "react-redux";

const Success = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteCart(cart._id));
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        The payment was successful
      </h1>
      <Link
        to={"/dashboard"}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to the dashboard
      </Link>
    </div>
  );
};

export default Success;
