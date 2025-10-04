import React, { useState } from "react";

const Model = ({ id, setIsOpened, setComments }) => {
  const [data, setData] = useState("");

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        text: data,
      }),
    });
    const returnedData = await res.json();
    setComments(returnedData);
    setIsOpened(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-16 py-8 flex flex-col items-center justify-center gap-16"
      >
        <h1 className="text-2xl">Update Comment</h1>
        <div className="flex flex-col gap-4 items-start">
          <label className="" htmlFor="comment">
            New Comment
          </label>
          <input
            type="text"
            className="p-4 rounded-2xl border-2 border-[#FE7F2D]"
            name="comment"
            onChange={handleChange}
            id="comment"
            placeholder="Comment"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpened(false)}
            className="bg-[#233d4d] text-white p-4 rounded-2xl"
          >
            Cancel
          </button>
          <button className="bg-[#FE7F2D] text-white p-4 rounded-2xl">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Model;
