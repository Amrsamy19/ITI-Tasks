import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Model from "./Model";

function BookDetails() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [book, setBook] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  const fetchBook = async () => {
    const response = await fetch(`http://localhost:3000/api/books/${id}`);
    const data = await response.json();
    setBook(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex align-center gap-8 p-6">
            <div className="w-1/2">
              <div className="flex justify-center">
                <img
                  src={book.bookCoverImage}
                  alt={book.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="flex-1 mt-8 lg:mt-0 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <span>{new Date(book.createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-2">{book.genre}</div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {showFullDescription
                      ? book.description
                      : `${book.description.substring(0, 300)}...`}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                </div>
                <div className="text-left space-y-4 mt-8">
                  <p className="text-3xl font-bold text-green-600">
                    ${book.price}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setPopUp(true)}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
                    user.role === "admin" ? "" : "hidden"
                  }`}
                >
                  Edit Book
                </button>

                {popUp && (
                  <Model type={"edit"} book={book} setPopUp={setPopUp} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
