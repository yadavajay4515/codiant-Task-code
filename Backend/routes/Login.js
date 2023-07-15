const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ajayyadav@123";
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), async (req, res) => {
  const imageUrl = req.file.path;
  const { name, email, phonenumber, password } = req.body;
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({
        success,
        error: "sorry email is already exists",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    var secPass = await bcrypt.hash(password, salt);

    user = await User.create({
      name: name,
      email: email,
      phonenumber: phonenumber,
      password: secPass,
      files: imageUrl,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success =true;
    res.send({ success, authtoken });
  } catch (error) {
    res.status(500).send("some Error");
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let success = false;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success,
        error: "email not match",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(200).json({
        success,
        error: "password not match",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.send({ success, authtoken });
    
  } catch (error) {
    res.status(500).send("some Error");
  }
});



router.get("/getragisterdata", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
