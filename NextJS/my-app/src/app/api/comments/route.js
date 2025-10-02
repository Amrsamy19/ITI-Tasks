import { comments } from "@/data/data";

export async function GET() {
  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}

export async function POST(req) {
  const data = await req.json();
  comments.unshift(data);
  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}