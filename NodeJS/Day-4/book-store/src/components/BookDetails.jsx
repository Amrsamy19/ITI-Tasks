import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Model from "./Model";
import { checkAuth } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../redux/store/slices/booksSlice";

function BookDetails() {
  const { currentBook } = useSelector((state) => state.books);
  const actions = useDispatch();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    actions(fetchBookById(id));
    setLoading(false);
  }, [actions, id, currentBook]);

  if (!currentBook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-center">Loading...</h1>
      </div>
    );
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
          <button
            onClick={() => navigate("/dashboard")}
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
                  src={currentBook.bookCoverImage}
                  alt={currentBook.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="flex-1 mt-8 lg:mt-0 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentBook.title}
                </h1>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <span>
                        {new Date(currentBook.createdAt).toDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-2">{currentBook.genre}</div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <div className="prose max-w-none">
                  <p
                    className={`${
                      showFullDescription ? "" : "line-clamp-1 break-words"
                    } leading-relaxed`}
                  >
                    {currentBook.description}
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
                    ${currentBook.price}
                  </p>
                </div>
              </div>

              {checkAuth(currentBook, user) && (
                <div>
                  <button
                    onClick={() => setPopUp(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Edit Book
                  </button>

                  {popUp && (
                    <Model
                      type={"edit"}
                      book={currentBook}
                      setPopUp={setPopUp}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
