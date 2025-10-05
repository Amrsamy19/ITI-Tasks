"use client";
import Protected from "@/components/ui/Protected";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Model from "@/components/Model";

const Page = () => {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

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
      setData("");
    } else {
      toast.error("Something went wrong", {
        duration: 2000,
      });
      setData("");
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
            <div
              className="flex items-center justify-between w-1/3 p-4"
              key={comment._id}
            >
              <h2 className="text-2xl text-[#FE7F2D] w-full">{comment.text}</h2>
              <div className="flex w-full justify-around items-center">
                <button
                  onClick={() => {
                    setEditingCommentId(
                      comment._id === editingCommentId ? null : comment._id
                    );
                    setIsOpened(!isOpened);
                  }}
                  className="bg-[#FE7F2D] px-5 py-4 rounded-2xl border border-amber-50 font-bold text-amber-50 hover:bg-amber-50 hover:text-[#FE7F2D] hover:border-amber-500 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="bg-[#FE7F2D] px-5 py-4 rounded-2xl border border-amber-50 font-bold text-amber-50 hover:bg-amber-50 hover:text-[#FE7F2D] hover:border-amber-500 transition duration-300"
                >
                  Delete
                </button>
              </div>
              {isOpened && (
                <Model
                  id={editingCommentId}
                  setIsOpened={setIsOpened}
                  setComments={setComments}
                />
              )}
            </div>
          ))
        )}
      </div>
    </Protected>
  );
};

export default Page;
