const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc Get all products
// @route GET /api
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const productsPerPage = parseInt(req.query.productsPerPage) || 10;

  fs.readFile("server/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const start = page * productsPerPage;
    const end = start + productsPerPage;

    const result = jsonData.products.slice(start, end);

    res.status(200).json({
      products: result,
      total: jsonData.products.length,
      page,
      productsPerPage,
      totalPages: Math.ceil(jsonData.products.length / productsPerPage),
    });
  });
});

module.exports = {
  getAllProducts,
};
