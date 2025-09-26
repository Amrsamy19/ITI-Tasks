import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBook, updateBook } from "../redux/store/slices/booksSlice";

function Model({ setPopUp, type, book }) {
  const { error, message } = useSelector((state) => state.books);
  const actions = useDispatch();
  const [formData, setFormData] = useState(book || {});
  const [action] = useState(type === "edit" ? "Edit" : "Add");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions(action === "Edit" ? updateBook(formData) : addNewBook(formData));
    setPopUp(false);
  };

  useEffect(() => {}, [error, message]);

  return (
    <div className="z-20 w-screen h-screen bg-gray-900/60 fixed top-0 right-0 flex justify-center items-center">
      <div className="bg-white w-1/2 p-10 rounded-md shadow-md">
        <h1 className="font-bold text-center text-2xl my-5">Add a book</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>Image:</label>
            <input
              type="text"
              name="bookCoverImage"
              value={formData.bookCoverImage}
              onChange={handleChange}
              placeholder="Image"
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>Created at:</label>
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              placeholder="Created at"
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => setPopUp(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {action}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Model;
