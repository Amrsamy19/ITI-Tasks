import { useEffect, useState } from "react";
import Book from "./Book";
import Model from "./Model";

const Dashboard = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;
    try {
      const response = await fetch(
        `http://localhost:3000/api/books?q=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        setError("");
      } else {
        setError("No books found");
      }
    } catch (error) {
      setError("Error fetching books:", error.message);
    }
  };

  const handleSort = async (event) => {
    const sortBy = event.target.value;
    const response = await fetch(
      `http://localhost:3000/api/books?sort=${sortBy}`
    );
    const data = await response.json();
    setBooks(data);
  };

  const getBooks = async () => {
    if (books.length > 0) return;
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        setError("");
        setBooks(data);
      } else {
        setLoading(true);
        setError("Failed to fetch books");
      }
    } catch (error) {
      setError("Error fetching books:", error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome,
            <span className="text-blue-800">
              {` ${user?.name || user?.username}`}
            </span>
            !
          </h2>
          <button
            onClick={() => setPopUp(true)}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
              user.role === "admin" ? "" : "hidden"
            }`}
          >
            Add a Book
          </button>
          {popUp && <Model type={"add"} book={null} setPopUp={setPopUp} />}
        </div>
        <div>
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-4 mt-8">
              Available Books
            </h2>
            <div className="flex items-center justify-around space-x-4 mb-4">
              <div className="flex items-center justify-around space-x-4">
                <label htmlFor="search">Search:</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  onChange={handleSearch}
                  placeholder="Search by title or description"
                  className="border border-gray-300 rounded-md px-4 py-2 bg-white"
                />
              </div>
              <div className="flex items-center justify-around space-x-4">
                <label htmlFor="filter">Filter by:</label>
                <select
                  name="filter"
                  id="filter"
                  defaultValue={""}
                  className="border border-gray-300 rounded-md px-4 py-2 bg-white"
                >
                  <option value="" disabled>
                    Select a filter
                  </option>
                  <option value="title">Title</option>
                  <option value="genre">Genre</option>
                </select>
              </div>
              <div className="flex items-center justify-around space-x-4">
                <label htmlFor="sort">Sort by Price</label>
                <select
                  name="sort"
                  onChange={handleSort}
                  id="sort"
                  defaultValue={""}
                  className="border border-gray-300 rounded-md px-4 py-2 bg-white"
                >
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="price">Ascending</option>
                  <option value="-price">Descending</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading books...</p>
          ) : error ? (
            <h3 className="text-red-500 font-bold text-2xl mt-24 text-center">
              {error}
            </h3>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <Book key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
