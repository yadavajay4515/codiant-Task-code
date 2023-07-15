const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Addproduct");
const fetchuser = require("../middeware/fatchuser");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.single("image"),
  fetchuser,
  async (req, res) => {
    let success = false;
    try {
      const imageUrl = req.file.path;
      const { name, price, weight } = req.body;
      const product = new Product({
        name,
        price,
        weight,
        files: imageUrl,
        user: req.user1.id,
      });
      const saveProduct = await product.save();
      success = true;
      res.json({ success, message: " save data successfully",saveProduct });
    } catch (error) {
      res.status(500).send("some Error");
    }
  }
);

router.get("/fetchproduct", fetchuser, async (req, res) => {
  try {
    console.log(req.user1.id);
    const product = await Product.find({ user: req.user1.id });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/addproduct/:userid", fetchuser, async (req, res) => {
  const userid = req.params.userid;
  console.log(userid);
  let success = false;
  try {
    const user = await Product.findById(userid);
    success = true;
    res.json({ success, user });
  } catch (error) {
    res.json({ success, message: error });
  }
});

router.put("/updateproduct/:id", fetchuser, async (req, res) => {
  console.log(req.body)
  const { name, price, weight,files } = req.body;
  const newproduct = {};
  if (name) {
    newproduct.name = name;
  }
  if (price) {
    newproduct.price = price;
  }
  if (weight) {
    newproduct.weight = weight;
  }
  if (files) {
    newproduct.files = files;
  }
  
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Not Found");
  }
  if (product.user.toString() !== req.user1.id) {
    return res.status(401).send("Not allow");
  }
  product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: newproduct },
    { new: true }
  );
  res.json({ product });
});

router.delete("/deleteproduct/:id", fetchuser, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Not Found");
    }
    if (product.user.toString() !== req.user1.id) {
      return res.status(401).send("Not allow");
    }
    product = await Product.findByIdAndDelete(req.params.id);

    res.json({ Success: "Product has been deleted successfully" });
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
