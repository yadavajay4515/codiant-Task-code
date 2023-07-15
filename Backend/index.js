const express = require("express");
const connectToMongo = require("./dbconnect");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const app = express();
const port = 8000;

connectToMongo;
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/Backend/uploads",express.static(path.join(__dirname, 'uploads')))

app.use("/loginRegister", require("./routes/Login"));
app.use("/product", require("./routes/Addproduct"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
