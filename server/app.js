const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

const PORT = 3000;
const { ConnectToDB } = require("./Utils/db");
const { transactionRouter } = require("./routes/transaction.route")
app.use(cors());
app.use(express.json());

app.get("/healthy", (req, res) => {
    try {
        res.status(200).send("Server is healthy");

    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

// Routes for transactions
app.use("/", transactionRouter)


app.listen(PORT, () => {
    try {
        console.log(`Server is running at port ${PORT}`);
        ConnectToDB()
    } catch (err) {
        console.log({ message: err.message });
    }
})