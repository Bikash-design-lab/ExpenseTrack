const express = require("express");

const { TransactionModel } = require("../model/transaction.model");

const transactionRouter = express.Router();

transactionRouter.post("/add", async (req, res) => {
    try {
        const transaction = new TransactionModel(req.body);
        await transaction.save();
        res.status(201).send({ message: "Transaction recorded successfully", transaction });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

transactionRouter.get("/", async (req, res) => {
    try {
        const AllCredit = await TransactionModel.find({ Type: "Credit" })
        const AllDebit = await TransactionModel.find({ Type: "Debit" })
        res.status(200).send({ AllCredit, AllDebit });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

transactionRouter.get("/totalBalance", async (req, res) => {
    try {
        const allCredit = await TransactionModel.find({ Type: "Credit" });
        const allDebit = await TransactionModel.find({ Type: "Debit" });
        let totalCredit = 0;
        let totalDebit = 0;
        allCredit.forEach((transaction) => {
            totalCredit += transaction.Amount;
        })
        allDebit.forEach((transaction) => {
            totalDebit += transaction.Amount;
        })
        const totalBalance = totalCredit - totalDebit;
        res.status(200).send({ totalBalance });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})


transactionRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await TransactionModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Transaction deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

transactionRouter.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTransaction = await TransactionModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ message: "Transaction updated successfully", updatedTransaction });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

module.exports = { transactionRouter };