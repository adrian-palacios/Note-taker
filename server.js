const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
	console.log("port is running!");
});
