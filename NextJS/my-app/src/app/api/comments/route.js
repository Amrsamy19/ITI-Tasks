import connectToDatabase from "@/lib/mongo";
import Comment from "@/models/comments";

export async function GET() {
  await connectToDatabase();
  const comments = await Comment.find({});
  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}

export async function POST(req) {
  const data = await req.json();

  if (!data) return new Response({ error: "No data" }, { status: 400 });

  await connectToDatabase();

  const comment = new Comment({ ...data, creadtedAt: new Date() });
  await comment.save();

  return new Response(JSON.stringify(comment), {
    status: 200,
  });
}
