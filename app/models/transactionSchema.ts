import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    amount: Number,
    description: String,
    userId: Schema.Types.ObjectId,
    date: Date,
}, { timestamps: true });

const TransactionSchema = mongoose.models.TransactionSchema || mongoose.model("TransactionSchema", transactionSchema);

export default TransactionSchema;