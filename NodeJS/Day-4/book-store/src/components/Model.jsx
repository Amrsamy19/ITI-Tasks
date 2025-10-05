import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBook, updateBook } from "../redux/store/slices/booksSlice";
import { useTranslation } from "react-i18next";

function Model({ setPopUp, type, book }) {
  const { error, message } = useSelector((state) => state.books);
  const actions = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState(book || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions(type === "edit" ? updateBook(formData) : addNewBook(formData));
    setPopUp(false);
  };

  useEffect(() => {}, [error, message, actions]);

  return (
    <div
      onClick={() => setPopUp(false)}
      className="z-20 w-screen h-screen bg-gray-900/60 fixed top-0 right-0 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-1/2 p-10 rounded-md shadow-md"
      >
        <h1 className="font-bold text-center text-2xl my-5">
          {t("addBook.addBook")}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.title")}:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t("addBook.title")}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.bookCoverImage")}:</label>
            <input
              type="text"
              name="bookCoverImage"
              value={formData.bookCoverImage}
              onChange={handleChange}
              placeholder={t("addBook.bookCoverImage")}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.genre")}:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder={t("addBook.genre")}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.price")}:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder={t("addBook.price")}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.createdAt")}:</label>
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              placeholder={t("addBook.createdAt")}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <label>{t("addBook.description")}:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t("addBook.description")}
              rows={3}
              className="block border border-gray-200 rounded-md px-4 py-2 mb-3 w-10/12"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => setPopUp(false)}
            >
              {t("addBook.cancel")}
            </button>
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {type === "edit" ? t("addBook.update") : t("addBook.add")}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Model;
