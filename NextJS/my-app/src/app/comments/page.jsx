"use client";
import Protected from "@/components/ui/Protected";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState("");

  const getComments = async () => {
    const res = await fetch("http://localhost:3000/api/comments");
    const data = await res.json();
    setComments(data);
  };

  const handleClick = async () => {
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: comments.length + 1,
        text: data,
      }),
    });
    const returnedData = await res.json();
    if (res.ok) {
      setComments([returnedData, ...comments]);
      toast.success("Comment added successfully", {
        duration: 2000,
      });
    } else {
      toast.error("Something went wrong", {
        duration: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Comment deleted successfully", {
        duration: 2000,
      });
      setComments(data);
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const updateComment = async (com) => {
    let updatedComments = comments.map((comment) =>
      comment.id === +com.id ? { ...comment, text: data } : comment
    );

    const res = await fetch(
      `http://localhost:3000/api/comments/${comment.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          comments: updatedComments,
        }),
      }
    );
    const returnedData = await res.json();
    setComments(returnedData);
    setData("");
  };

  const handleUpdate = (comment) => {
    updateComment(comment);
  };

  useEffect(() => {
    getComments();
  }, []);

  if (!comments) return <p>Loading...</p>;

  return (
    <Protected>
      <div className="flex flex-col justify-center items-center p-6">
        <div className="flex flex-col justify-center items-center gap-4 mb-24">
          <label className="text-2xl font-bold text-[#FE7F2D]">
            Add a comment
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              name="comment"
              id="comment"
              className="border border-amber-500 rounded-2xl p-4"
              placeholder="Add a comment"
              onChange={handleChange}
            />
            <button
              onClick={handleClick}
              className="bg-[#FE7F2D] px-5 py-4 rounded-2xl border border-amber-50 font-bold text-amber-50 hover:bg-amber-50 hover:text-[#FE7F2D] hover:border-amber-500 transition duration-300"
            >
              Add
            </button>
          </div>
        </div>

        {comments.length === 0 ? (
          <h1 className="text-2xl text-[#FE7F2D] font-extrabold">
            No comments yet
          </h1>
        ) : (
          comments.map((comment) => (
            <div key={comment._id}>
              <h2 className="text-2xl text-[#FE7F2D]">{comment.text}</h2>
              <div className="flex gap-2">
                <div>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Update Comment"
                    onChange={handleChange}
                    className="border border-amber-500 rounded-2xl p-4"
                  />
                  <button
                    onClick={() => handleUpdate(comment)}
                    className="bg-[#FE7F2D] px-5 py-4 rounded-2xl border border-amber-50 font-bold text-amber-50 hover:bg-amber-50 hover:text-[#FE7F2D] hover:border-amber-500 transition duration-300"
                  >
                    Edit
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="bg-[#FE7F2D] px-5 py-4 rounded-2xl border border-amber-50 font-bold text-amber-50 hover:bg-amber-50 hover:text-[#FE7F2D] hover:border-amber-500 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </Protected>
  );
};

export default Page;
