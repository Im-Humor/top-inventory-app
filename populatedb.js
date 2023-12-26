const Item = require("./models/item");
const Category = require("./models/category");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gfyczkq.mongodb.net/inventory-app?retryWrites=true&w=majority`;

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createCategories();
	await createItems();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}
main().catch((err) => console.log(err));

categories = [];
items = [];

async function categoryCreate(index, name, desc) {
	const category = new Category({ name: name, desc: desc });
	await category.save();
	categories[index] = category;
	console.log(`Added category ${name}`);
}

async function itemCreate(index, name, desc, category, price, amount) {
	const item = new Item({
		name: name,
		desc: desc,
		category: category,
		price: price,
		amount: amount,
	});
	await item.save();
	items[index] = item;
	console.log(`Added item ${item}`);
}

async function createCategories() {
	console.log("Adding categories");
	await Promise.all([
		categoryCreate(
			0,
			"Food",
			"A category of items that can be orally consumed by humans"
		),
		categoryCreate(
			1,
			"Cars",
			"A category containing vehicles of various makes and models"
		),
		categoryCreate(
			2,
			"Computers",
			"A category containing computers of various operating systems and manufacturers"
		),
	]);
}

async function createItems() {
	console.log("Adding items");
	await Promise.all([
		itemCreate(
			0,
			"Banana",
			"A lengthy yellow fruit",
			categories[0],
			0.99,
			14
		),
		itemCreate(1, "Apple", "A round red fruit", categories[0], 1.99, 23),
		itemCreate(
			2,
			"2011 BMW 328i",
			"A beautiful entry-level BMW 3-series",
			categories[1],
			12999.99,
			1
		),
		itemCreate(
			3,
			"2019 Ford Mustang EcoBoost",
			"A pony car bargain",
			categories[1],
			24999.97,
			3
		),
		itemCreate(
			4,
			"2016 Dodge Charger R/T",
			"A four-door muscle car with a 5.7L v8",
			categories[1],
			22549.87,
			2
		),
		itemCreate(
			5,
			"2023 MacBook Pro M3",
			"Apple's latest laptop with their newest processor",
			categories[2],
			1999.99,
			5
		),
		itemCreate(
			6,
			"2022 ASUS Flow X13",
			"An ultrabook with a dedicated GPU and long lasting battery life",
			categories[2],
			799.99,
			2
		),
	]);
}
