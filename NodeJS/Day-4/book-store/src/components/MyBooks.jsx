import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";

const MyBooks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setBooks(data);
        setLoading(false);
        setError("");
      } else {
        setError(data.error);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-blue-800">{user.name}'s</span> Books
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {error && (
            <p className="text-center text-2xl text-red-600">{error}</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-2xl text-blue-800">Loading...</p>
  );
};

export default MyBooks;
