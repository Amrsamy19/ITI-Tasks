import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Model({ setPopUp, type, book }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(book || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [action] = useState(type === "edit" ? "Edit" : "Add");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormData({
      ...formData,
      createdBy: JSON.parse(localStorage.getItem("user"))._id,
    });
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/${book._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loading ? `${action.toLowerCase()}ing...` : action}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Model;
