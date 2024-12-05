/** @format */

function getPath(path) {
	const path_joiner = require("path").join;
	path = path_joiner(__dirname, "../", path);
	return path;
}

module.exports = getPath;
