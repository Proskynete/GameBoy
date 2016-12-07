"use strict"

// Consts
const gulp = require("gulp")
const browserSync = require("browser-sync").create()
const reload = browserSync.reload

// Task server
gulp.task("server", () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	})
})
// Task watch
gulp.task("watch", () => {
	gulp.watch("./index.html").on("change", reload)
	gulp.watch("./public/gb_styles.sass").on('change', reload)
	gulp.watch("./public/gb_script.ts").on('change', reload)
})

// Task default
gulp.task("default", ["server", "watch"])