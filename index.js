/** @format */

// Our imports
const express = require("express");
const mysql = require("mysql2");
const app = express();
const getPath = require("./modules/getPath");
const getFormattedDateTime = require("./modules/getFormattedDateTime");
const fs = require("node:fs");

// Our page's path
const page_path = getPath("/pages/");
console.log(page_path);

// Our paths (when we launch)
const pages = fs.readdirSync(page_path).filter((path) => !path.includes("."));
pages.push("public");

// Dotenv config
require("dotenv").config();
const host = process.env["host"];
const viewer_user = process.env["viewer_user"];
const viewer_password = process.env["viewer_password"];
const writer_user = process.env["writer_user"];
const writer_password = process.env["writer_password"];

const database = process.env["database"];
const port = process.env["port"];
const table = process.env["table"];

// Create a connection pool
const viewer_pool = mysql.createPool({
	connectionLimit: 10, // Adjust the limit as needed
	host: host,
	user: viewer_user,
	password: viewer_password,
	database: database,
});

const writer_pool = mysql.createPool({
	connectionLimit: 10, // Adjust the limit as needed
	host: host,
	user: writer_user,
	password: writer_password,
	database: database,
});

// Middleware to handle MySQL connection
app.use((req, res, next) => {
	req.viewer_pool = viewer_pool;
	if (req.method == "POST" || true) req.writer_pool = writer_pool;
	next();
	console.log(req.url);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get("/testy", (req, res) => {
	req.viewer_pool.query(`SELECT * FROM ${table}`, (error, results) => {
		if (error) {
			return res.status(500).send(error);
		}
		res.json(results);
	});
});

app.get("/testy2", (req, res) => {
	const ts = getFormattedDateTime();
	req.writer_pool.query(
		`INSERT INTO ${table} (id, answers, expected_answers, ts) VALUES (NULL, 'Y', 'X', '${ts}')`,
		(error, results) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.json(results);
		}
	);
});

app.get("/testy3", (req, res) => {
	req.writer_pool.query(
		`DELETE FROM ${table}`,
		(error, results) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.json(results);
		}
	);
});

app.get("/public", express.static(getPath("/public")));
// /public/other/yap.txt

app.get("*", (req, res, next) => {
	let split_path = [];

	try {
		split_path = req.url.split("/").filter((str) => str != "");
	} catch (e) {} // If there's an error, we'll just ignore it

	if (split_path.length == 0) split_path = ["home", "index.html"];

	let last = split_path.length - 1;
	req.paths_split = split_path;

	// If we want 404 files or for us to actually go to the 404 page...
	if (!pages.includes(split_path[0])) {
		next();
		return;
	}

	const file_split = split_path[last].split(".");

	last = file_split.length - 1;
	const file_suffix = file_split[last];

	let suffix = file_suffix;

	// If suffix isn't included, change it to html
	if (!["css", "js", "html"].includes(suffix)) suffix = "html";
	if (split_path[last].indexOf(".") < 0) {
		//split_path.pop();
		split_path.push("index." + suffix);
	}

	if (split_path[0] != "public") split_path.unshift("pages");

	const path = getPath(split_path.join("/"));

	console.log(path);
	if (!fs.existsSync(path)) {
		next();
		return;
	}

	return res.sendFile(getPath(split_path.join("/")));
});

// 404 handler
app.get("*", (req, res) => {
	const filePath = getPath("/pages/404/index.html");
	res.sendFile(filePath);
});


// Our post requests handler(s)
app.post('/login', (req, res) => {
	console.log(req.body);
	const { accessKey } = req.body;
	if (accessKey) {
		res.send('You are logged in');
	} else {
		res.send('Username or password incorrect');
	}
});



app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
