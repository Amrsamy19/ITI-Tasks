import { BsTrash2 } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { checkAuth } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { addCart, addToCart } from "../redux/store/slices/cartSlice";
import { deleteBook } from "../redux/store/slices/booksSlice";
import Notification from "./Notification";

function Book({ book }) {
  const { message } = useSelector((state) => state.books);
  const action = useDispatch();

  const handleDelete = async (event) => {
    event.preventDefault();
    action(deleteBook(book._id));
  };

  const handleClick = (event) => {
    event.preventDefault();
    action((action, getState) => {
      action(
        addToCart({
          productId: book._id,
          price: book.price,
          poster: book.bookCoverImage,
          title: book.title,
        })
      );

      const { cart } = getState().cart;
      action(addCart(cart));
    });
  };

  return (
    <>
      {message && <Notification message={message} type={"success"} />}
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
    </>
  );
}

export default Book;
