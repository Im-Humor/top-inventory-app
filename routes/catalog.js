const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/item");
const Category = require("../models/category");

//get list of item objects

router.get("/", (req, res) => {
	res.render("index", { title: "Homepage" });
});

router.get("/categories", (req, res) => {
	async function getCategories() {
		let categoryList = await Category.find({}).exec();
		res.render("all_categories", {
			title: "Categories",
			categories: categoryList,
		});
	}
	getCategories();
});

router.get("/items", (req, res) => {
	async function getItems() {
		let itemList = await Item.find({}).exec();
		res.render("all_items", {
			title: "Items",
			items: itemList,
		});
	}
	getItems();
});

router.get("/category/:categoryID", (req, res) => {
	async function getCategory() {
		let searchCategory = await Category.findById(
			req.params.categoryID
		).exec();
		res.render("view_category", {
			title: searchCategory.name,
			category: searchCategory,
		});
	}
	getCategory();
});

router.get("/item/:itemID", (req, res) => {
	async function getItem() {
		let searchItem = await Item.findById(req.params.itemID).exec();
		res.render("view_item", {
			title: searchItem.name,
			item: searchItem,
		});
	}
	getItem();
});

router.get("/categories/new", (req, res) => {
	res.render("new_category", { title: "Add New Category" });
});

router.post("/categories/new", (req, res) => {
	async function makeNewCategory() {
		console.log(req.body);
		const newCategory = new Category({
			name: req.body.name,
			desc: req.body.desc,
		});
		await newCategory.save();
		res.render("new_category", { title: "Add New Category" });
	}
	makeNewCategory();
});

module.exports = router;
