"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  });

  if (!posts.length) return <p>Loading...</p>;
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Page;
