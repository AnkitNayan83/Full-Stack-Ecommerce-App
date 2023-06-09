const router = require("express").Router();
const User = require("../modals/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
// for local devlopment
// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

router.post("/login", async (req, res) => {
  // await sleep(5000);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong Username or password");
      return;
    }

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pword = hashedPass.toString(CryptoJS.enc.Utf8);

    if (pword !== req.body.password) {
      res.status(401).json("Wrong Username or password");
      return;
    }
    const accessToken = jwt.sign(
      //session || to track user whether he is the owner or not
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    );
    const { password, ...others } = user._doc; // mongoDB stores user info under _doc
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
