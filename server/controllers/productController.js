const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc Get all products
// @route GET /api
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  fs.readFile("server/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const result = jsonData.products.slice();

    res.status(200).json({
      products: result,
      total: jsonData.products.length,
    });
  });
});

module.exports = {
  getAllProducts,
};
