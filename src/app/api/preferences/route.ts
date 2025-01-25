import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("mydatabase");

  // Use the user's email or ID to query preferences
  const preferences = await db
    .collection("preferences")
    .findOne({ userId: session.user.id });

  return NextResponse.json(preferences || {});
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("mydatabase");

  const body = await req.json();
  const { preferences } = body;

  // Use session.user.id or session.user.email to uniquely identify the user
  await db.collection("preferences").updateOne(
    { userId: session.user.id }, // or session.user.email
    { $set: { preferences } },
    { upsert: true }
  );

  return NextResponse.json({ message: "Preferences saved successfully" });
}
