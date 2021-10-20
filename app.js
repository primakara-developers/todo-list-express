if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/", router);

app.use(errorHandler);
app.listen(port, () => {
  console.log("App listen on port " + port);
});
