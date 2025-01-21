import mongoose from "mongoose";
import connectMongoDB from "../../libs/mongoDB";
import { Transaction } from "../../models/transaction";
import TransactionSchema from "../../models/transactionSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const transactions = await TransactionSchema.find();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await connectMongoDB();
  const { amount, description, userId, date } = await request.json();
  const objectUserId = new mongoose.mongo.ObjectId(userId);
  const newTransaction = await TransactionSchema.create({ amount, description, userId: objectUserId, date });
  return NextResponse.json(newTransaction);
}