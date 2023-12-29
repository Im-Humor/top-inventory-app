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
		let categoryItems = await Item.find({ category: searchCategory._id });
		res.render("view_category", {
			title: searchCategory.name,
			category: searchCategory,
			items: categoryItems,
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

router.get("/category/:categoryID/delete", (req, res) => {
	async function renderDeleteCategory() {
		console.log(req.body);
		const deleteCategory = await Category.findById(req.params.categoryID);
		res.render("delete_category", {
			title: "Delete Category",
			category: deleteCategory,
		});
	}
	renderDeleteCategory();
});

router.post("/category/:categoryID/delete", (req, res) => {
	async function deleteCategory() {
		const deleted = await Category.deleteOne({
			_id: req.params.categoryID,
		});
		console.log(deleted);
		res.redirect("/catalog/categories");
	}
	deleteCategory();
});

router.get("/category/:categoryID/edit", (req, res) => {
	async function renderEditCategory() {
		const category = await Category.findById(req.params.categoryID);
		res.render("edit_category", {
			title: "Edit Category",
			category: category,
		});
	}
	renderEditCategory();
});

router.post("/category/:categoryID/edit", (req, res) => {
	async function editCategory() {
		const category = await Category.findById(req.params.categoryID);
		const update = await Category.updateOne(
			{ _id: category._id },
			{ name: req.body.name, desc: req.body.desc }
		);
		console.log(update);
		res.redirect("/catalog/categories");
	}
	editCategory();
});

module.exports = router;
