const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
  methods: ["POST", "GET", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", require("./routes/product"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
