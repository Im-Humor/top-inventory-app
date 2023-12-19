// require modules
const express = require("express");
const app = express();

//require routers
const indexRouter = require("./routes/index");

//set view engine to ejs
app.set("views", "./views");
app.set("view engine", "ejs");

//start server on port 3000
app.listen(3000);

//load router files
app.use("/", indexRouter);
