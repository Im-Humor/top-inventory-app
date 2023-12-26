// require modules
const express = require("express");
const app = express();
require("dotenv").config();

//set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gfyczkq.mongodb.net/inventory-app?retryWrites=true&w=majority`;

async function main() {
	await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

//require routers
const indexRouter = require("./routes/index");

//set view engine to ejs
app.set("views", "./views");
app.set("view engine", "ejs");

//start server on port 3000
app.listen(3000);

//load router files
app.use("/", indexRouter);
