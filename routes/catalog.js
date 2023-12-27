const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/item");
const Category = require("../models/category");

//get list of category objects
let categoryList = [];
async function getCategories() {
	categoryList = await Category.find({}).exec();
}
getCategories();

//get list of item objects
let itemList = [];
async function getItems() {
	itemList = await Item.find({}).exec();
}
getItems();

router.get("/", (req, res) => {
	res.render("index", { title: "Homepage" });
});

router.get("/categories", (req, res) => {
	res.render("all_categories", {
		title: "Categories",
		categories: categoryList,
	});
});

module.exports = router;
