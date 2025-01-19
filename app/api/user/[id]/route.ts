import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function GET(request: Request, { params }: any) {
  await connectMongoDB();
  const { id } = await params;

  try {
    const objectId = new ObjectId(id);
    const user = await User.findOne({ _id: objectId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: any) {
  await connectMongoDB();
  const { id } = params;

  try {
    const objectId = new ObjectId(id);
    const userData = await request.json();

    const updatedUser = await User.findOneAndUpdate(
      { _id: objectId },
      { $set: userData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}