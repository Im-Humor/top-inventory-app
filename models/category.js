const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: 100 },
	desc: { type: String, maxLength: 400 },
	URL: String,
});

categorySchema.virtual("url").get(function () {
	return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
