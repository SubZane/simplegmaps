const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const files = {
	scssPath: "src/sass/**/*.scss",
	jsPath: "src/**/*.js",
	demoJS: "demo/js",
	dist: "dist",
};

function uglifyTask() {
	return src(files.jsPath)
		.pipe(uglify())
		.pipe(rename({ extname: ".min.js" }))
		.pipe(dest(files.dist))
		.pipe(dest(files.demoJS));
}

function copyJS() {
	return src(files.jsPath).pipe(dest(files.dist)).pipe(dest(files.demoJS));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
	watch(
		[files.scssPath, files.jsPath],
		{ interval: 1000, usePolling: true }, //Makes docker work
		series(parallel(uglifyTask, copyJS))
	);
}

exports.default = parallel(uglifyTask, copyJS, watchTask);
exports.build = parallel(uglifyTask, copyJS);
