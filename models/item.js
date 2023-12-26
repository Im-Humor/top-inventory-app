const { Decimal128 } = require("mongodb");
const { default: mongoose, Schema } = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: 100 },
	desc: { type: String, maxLength: 400 },
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
		maxLength: 100,
	},
	price: Decimal128,
	amount: Number,
});

itemSchema.virtual("url").get(function () {
	return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
