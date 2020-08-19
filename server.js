const express = require("express");
const fs = require("fs");
//path for sendFile
const path = require("path");
//database connecting to server.js
const db = require("./db/db.json");
const PORT = process.env.PORT || 5000;
const app = express();
// used for incrementation without ++
const date = new Date();
let id = date.getTime();
//express needs this
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// html path
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// to read notes from database
app.get("/api/notes", (req, res) => {
	res.json(db);
});
// post path to create new notes into database
app.post("/api/notes", (req, res) => {
	req.body.id = id;
	db.push(req.body);
	fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
		if (err) throw err;
	});
	res.json(db);
});
// delete path
app.delete("/api/notes/:id", (req, res) => {
	let b = req.params.id;
	for (let i = 0; i < db.length; i++) {
		console.log(i);
		if (parseInt(b) === db[i].id) {
			db.splice(i, 1);
		}
	}
	//rewritting db again
	fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
		if (err) throw err;
	});
	res.json(db);
});
// universal path
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
	console.log("port is running!");
});
