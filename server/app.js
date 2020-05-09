require("dotenv").config();
require("./config/dbConnection");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

/*  Cross Origin Ressource Sharing
    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*/
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // white list of clients, allowing specific domains to communicate with the api.
    credentials: true, // Allow client to send cookies.
  })
);

app.use(logger("dev"));
app.use(express.json()); // Allows us to access data sent as json through request.body
app.use(express.urlencoded({ extended: false })); // Alows us to access data sent as urlencoded through request.body
app.use(cookieParser()); // Allows us to access cookies through request.cookies
app.use(express.static(path.join(__dirname, "public"))); // Define public folder to serve static assets, imgs, etc..

/*  Routers ! */

app.use("/", indexRouter);
app.use("/api/items", require("./routes/items"));

/*  App is exported and then used in ./bin/www where the http server is initialized. */
module.exports = app;
