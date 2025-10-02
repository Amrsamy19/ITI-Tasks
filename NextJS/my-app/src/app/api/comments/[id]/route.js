import { comments } from "@/data/data";

export async function DELETE(req, { params }) {
  const { id } = await params;
  const commentIndex = comments.findIndex((comment) => comment.id === +id);
  comments.splice(commentIndex, 1);
  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}

export async function PUT(req, { params }) {
  const data = await req.json();

  let newComments = data.comments;
  return new Response(JSON.stringify(newComments), {
    status: 200,
  });
}
