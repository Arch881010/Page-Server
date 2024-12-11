/** @format */

// Our imports
const express = require("express");
const mysql = require("mysql2");
const app = express();
const getPath = require("./modules/getPath");
const getFormattedDateTime = require("./modules/getFormattedDateTime");
const fs = require("node:fs");
const keywords = require("./modules/getKeywords");

// Our page's path
const page_path = getPath("/pages/");
console.log("Serving pages from:", page_path);

// Our paths (when we launch)
const pages = fs.readdirSync(page_path).filter((path) => !path.includes("."));
pages.push("public");

// Dotenv config
require("dotenv").config();

sql_accounts = {};
sql_details = {};

const port = process.env["port"];
const sqlStatus = process.env["sql"];

if (!keywords["disabled"].includes(sqlStatus)) {
	console.log("SQL is enabled, saving users.");
	const host = process.env["host"];
	const viewer_user = process.env["viewer_user"];
	const viewer_password = process.env["viewer_password"];
	const writer_user = process.env["writer_user"];
	const writer_password = process.env["writer_password"];
	const database = process.env["database"];

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

	sql_accounts = {
		viewer: viewer_pool,
		writer: writer_pool,
	};

	sql = {
		database: database,
		table: process.env["table"],
	};
}

// Middleware to handle MySQL connection
app.use((req, res, next) => {
	if (sql_accounts.length != 2) {
		next();
		req.sql = false;
		return;
	} else {
		req.viewer_pool = viewer_pool;
		if (req.method == "POST" || true) req.writer_pool = writer_pool;
		next();
		req.sql = true;
		//console.log(req.url);
		return;
	}
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The following are a bunch of test routes. Feel free to comment out if you plan on using these to test.

/*
app.get("/testy", (req, res) => {
	if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
	req.viewer_pool.query(`SELECT * FROM ${sql.table}`, (error, results) => {
		if (error) {
			return res.status(500).send(error);
		}
		res.json(results);
	});
});

app.get("/testy2", (req, res) => {
	if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
	const ts = getFormattedDateTime();
	req.writer_pool.query(
		`INSERT INTO ${sql.table} (id, answers, expected_answers, ts) VALUES (NULL, 'Y', 'X', '${ts}')`,
		(error, results) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.json(results);
		}
	);
});

app.get("/testy3", (req, res) => {
	if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
	req.writer_pool.query(
		`DELETE FROM ${sql.table}`,
		(error, results) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.json(results);
		}
	);
});
*/

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

	last = split_path.length - 1;

	let suffix = file_suffix;

	// If suffix isn't included, change it to html
	if (!["css", "js", "html"].includes(suffix)) suffix = "html";
	if (split_path[last].indexOf(".") < 0) {
		//split_path.pop();
		split_path.push("index." + suffix);
	}

	if (split_path[0] != "public") split_path.unshift("pages");

	const path = getPath(split_path.join("/"));

	//console.log(path);
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
app.post("/login", (req, res) => {
	//console.log(req.body);
	const { accessKey } = req.body;
	if (accessKey) {
		res.send("You are logged in");
	} else {
		res.send("Username or password incorrect");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
