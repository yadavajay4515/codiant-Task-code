var jwt = require("jsonwebtoken");

const JWT_SECRET = "ajayyadav@123";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate useing a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data)
    req.user1 = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate useing a valid token" });
  }
};

module.exports = fetchuser;
