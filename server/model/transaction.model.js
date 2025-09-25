const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    Amount: { type: Number, required: true },
    Type: { type: String, required: true, enum: ["Credit", "Debit"], default: "Credit" },
    Category: { type: String, required: true, enum: ["Food", "Transport", "Shopping", "Salary"], default: "Salary" },
    Description: { type: String }

}, { timestamps: true });

const TransactionModel = mongoose.model("transaction", transactionSchema);
module.exports = { TransactionModel };

