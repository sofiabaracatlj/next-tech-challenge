import connectMongoDB from '@/app/libs/mongoDB';
import { NextResponse } from 'next/server';
import TransactionSchema from "../../../models/transactionSchema";

export async function GET(request: Request, { params }: any) {
    await connectMongoDB();
    const { id } = await params;

    try {
        const transactions = await TransactionSchema.find({ userId: id });

        if (!transactions) {
            return NextResponse.json({ message: 'No transactions found' }, { status: 404 });
        }

        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: any) {
    await connectMongoDB();
    const { id } = params;

    try {
        const deletedTransaction = await TransactionSchema.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const updatedTransaction = await request.json();

    try {
        await connectMongoDB();
        const transaction = await TransactionSchema.findByIdAndUpdate(id, updatedTransaction, { new: true });

        if (!transaction) {
            return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
    }
}