import { useState } from "react";
import { BsTrash2 } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { checkAuth } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/store/slices/cartSlice";

function Book({ book }) {
  const cart = useSelector((state) => state.cart);
  const action = useDispatch();
  const [message, setMessage] = useState({ message: "", type: "" });
  const [opened, setOpened] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/books/${book._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setMessage({ message: data.message, type: "success" });
      setOpened(true);
    } else {
      const data = await response.json();
      setMessage({ message: data.error, type: "error" });
      setOpened(true);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    action(addToCart(book));
    console.log(cart);
  };

  return (
    <>
      <li className="relative w-full list-none" key={book._id}>
        <Link
          to={`/book/${book._id}`}
          className="block hover:scale-105 hover:opacity-75 transition duration-200"
        >
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-4 h-96">
            <img
              src={book.bookCoverImage}
              alt={book.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
              {book.title}
            </h3>
            <div className="flex justify-between z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <div>
                <p className="font-semibold text-white">{`Published at ${book.publishedYear}`}</p>
                <p className="font-semibold text-white">{`Price - ${book.price}$`}</p>
              </div>
            </div>
          </article>
        </Link>
        <div className="flex">
          <div className="absolute right-6 bottom-8">
            <button
              onClick={handleClick}
              className=" text-white text-bold text-2xl text-center p-2 rounded-xl hover:bg-blue-600 transition duration-200 mr-2"
            >
              <FaPlus />
            </button>
            {checkAuth(book, JSON.parse(localStorage.getItem("user"))) && (
              <button
                onClick={handleDelete}
                className="text-white text-bold text-2xl text-center p-2 rounded-xl hover:bg-red-600 transition duration-200"
              >
                <BsTrash2 />
              </button>
            )}
          </div>
        </div>
      </li>
      {opened && (
        <Notification
          message={message.message}
          type={message.type}
          setOpened={setOpened}
          setMessage={setMessage}
        />
      )}
    </>
  );
}

export default Book;
