import React from "react";

function Book({ book }) {
  return (
    <li className="w-full list-none" key={book._id}>
      <a
        href={`/book/${book._id}`}
        className="block hover:scale-105 hover:opacity-75 transition duration-200"
      >
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-4">
          <img
            src={book.bookCoverImage}
            alt="University of Southern California"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
          <h3 className="z-10 mt-3 text-3xl font-bold text-white">
            {book.title}
          </h3>
          <div className="flex justify-between z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            <p>{`Published at ${book.publishedYear}`}</p>
            <p>{`${book.price}$`}</p>
          </div>
        </article>
      </a>
    </li>
  );
}

export default Book;
