// require modules
const express = require("express");
const app = express();
// used for form submissions
app.use(express.urlencoded({ extended: true }));
//used for saving database credentials
require("dotenv").config();

//set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gfyczkq.mongodb.net/inventory-app?retryWrites=true&w=majority`;

async function main() {
	await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

//load css
app.use(express.static("public"));

//require routers
const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");

//set view engine to ejs
app.set("views", "./views");
app.set("view engine", "ejs");

//start server on port 3000
app.listen(3000);

//load router files
app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
