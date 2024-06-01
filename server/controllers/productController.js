const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc Get all products
// @route GET /api
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const productsPerPage = parseInt(req.query.productsPerPage) || 20;

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

// @desc Add new product
// @route POST /api
// @access Public
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image } = req.body;
  fs.readFile("server/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const highestId = jsonData.products.reduce(
      (max, product) => Math.max(max, product.id),
      0
    );

    const newProduct = {
      id: (highestId + 1).toString(),
      name,
      description,
      price,
      image,
    };

    jsonData.products.push(newProduct);

    fs.writeFile("server/db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(newProduct);
    });
  });
});

// @desc Update product
// @route PUT /api/:id
// @access Public
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  fs.readFile("server/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const product = jsonData.products.find((p) => p.id === id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;

    fs.writeFile("server/db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json(product);
    });
  });
});

// @desc Delete product
// @route Delete /api/:id
// @access Public
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  fs.readFile("server/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).send("Internal Server Error");
      return;
    }

    const index = jsonData.products.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).send("Product not found");
      return;
    } else {
      jsonData.products.splice(index, 1);
    }

    fs.writeFile("server/db.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json({ message: "Product deleted successfully" });
    });
  });
});

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
