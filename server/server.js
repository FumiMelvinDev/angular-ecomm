const dotenv = require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
  methods: "GET, POST",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
