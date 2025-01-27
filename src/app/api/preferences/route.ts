import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function GET(_req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("preferences");

  const preferences = await db
    .collection("preferences")
    .findOne({ userId: session.user.googleId });

  return NextResponse.json(preferences || {});
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("preferences");

  const body = await req.json();
  // Use session.user.id or session.user.email to uniquely identify the user
  await db.collection("preferences").updateOne(
    { userId: session.user.googleId }, // or session.user.email
    { $set: { preferences: body } },
    { upsert: true }
  );

  return NextResponse.json({ message: "Preferences saved successfully" });
}
