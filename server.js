const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");
const PORT = process.env.PORT || 5000;
const app = express();
let id = db.length + 1;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
	res.json(db);
});

app.post("/api/notes", (req, res) => {
	req.body.id = id++;
	db.push(req.body);
	fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
		if (err) throw err;
	});
	res.json(db);
});

app.delete("/api/notes/:id", (req, res) => {
	let id = req.params.id;
	for (let i = 1; i < db.length; i++) {
		console.log(i);
		if (parseInt(id) === db[i].id) {
			db.splice(i, 1);
		}
	}
	fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
		if (err) throw err;
	});
	res.json(db);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
	console.log("port is running!");
});
