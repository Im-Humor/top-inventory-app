const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", { title: "Homepage" });
});

router.get("/hello", (req, res) => {
	res.render("test", { title: "Homepage" });
});

module.exports = router;
