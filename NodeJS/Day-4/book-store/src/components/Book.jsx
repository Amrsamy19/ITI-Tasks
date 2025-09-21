import { useState } from "react";
import { BsTrash2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import Notification from "./Notification";

function Book({ book }) {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [opened, setOpened] = useState(false);

  const handleDelete = async () => {
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

  return (
    <>
      <li className="relative w-full list-none" key={book._id}>
        <Link
          to={`/book/${book._id}`}
          className="block hover:scale-105 hover:opacity-75 transition duration-200"
        >
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-4">
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
        <div className="absolute right-6 bottom-8">
          <button
            onClick={handleDelete}
            className="text-white text-bold text-2xl text-center p-2 rounded-xl hover:bg-red-600 transition duration-200"
          >
            <BsTrash2 />
          </button>
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
