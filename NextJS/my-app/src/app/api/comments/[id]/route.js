import connectToDatabase from "@/lib/mongo";
import Comment from "@/models/comments";

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) return new Response({ error: "No id" }, { status: 400 });

  await connectToDatabase();
  await Comment.findByIdAndDelete({ _id: id });

  const comments = await Comment.find({}).sort({ createdAt: -1 });

  return new Response(JSON.stringify(comments), { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  if (!id) return new Response({ error: "No id" }, { status: 400 });

  await connectToDatabase();

  await Comment.findByIdAndUpdate({ _id: id }, { ...data });

  const comments = await Comment.find({}).sort({ createdAt: -1 });

  return new Response(JSON.stringify(comments), { status: 200 });
}
