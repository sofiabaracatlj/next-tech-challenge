import connectMongoDB from "@/app/libs/mongoDB";
import User from "@/app/models/user";
import UserDTO from "@/app/models/userDTO";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  await connectMongoDB();
  const id = (await params).id;
  console.log('chmanado', id);
  const user = await User.findById(new mongoose.Types.ObjectId(id));
  console.log(user);
  const userDTO: UserDTO = {
    fullName: user.fullName,
    userName: user.userName,
    amount: user.amount
  };
  console.log(userDTO)
  return NextResponse.json(userDTO);
}

export async function POST(request: Request, { params }: any) {
  await connectMongoDB();
  const id = (await params).id;
  console.log('chmanado', id);
  const user = await User.create({ name: 'sofiabaracat', amount: 100 });
  console.log(user);
  return NextResponse.json(user);
}