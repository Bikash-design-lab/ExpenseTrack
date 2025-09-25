const express = require("express");

const { TransactionModel } = require("../model/transaction.model");

const transactionRouter = express.Router();

transactionRouter.post("/add", async (req, res) => {
    try {
        const transaction = new TransactionModel(req.body);
        await transaction.save();
        res.status(201).send({ message: "Transaction added successfully", transaction });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})


module.exports = { transactionRouter };