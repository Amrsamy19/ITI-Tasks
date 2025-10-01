import React from "react";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  return await res.json();
};

const Page = async () => {
  const posts = await getData();

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
