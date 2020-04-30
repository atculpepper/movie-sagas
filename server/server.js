const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const moviesRouter = require("./routes/movies.router");

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static("build")); //serving up static files
app.use(bodyParser.urlencoded({ extended: true })); //tuck sent data onto req.body

/** ---------- ROUTES ---------- **/
//Register moviesRouter
app.use("/", moviesRouter);
//I don't know why my server is depending on the /movies route!
app.use("/movies", moviesRouter);
// app.use("/details/:id", moviesRouter);
// app.use("/details", moviesRouter);
app.use("/edit/:id", moviesRouter);
// app.use("/edit", moviesRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log("Server is running on port: ", port);
});
