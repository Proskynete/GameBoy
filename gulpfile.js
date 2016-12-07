"use strict"

// Consts
const gulp = require("gulp")
const browserSync = require("browser-sync").create()
const reload = browserSync.reload
const sass = require('gulp-sass')
const ts = require('gulp-typescript');
const ghPages = require('gulp-gh-pages');

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
	gulp.watch("./index.html").on('change', reload)
	gulp.watch("./assets/css/gb_styles.css").on('change', reload)
	gulp.watch("./assets/js/gb_script.js").on('change', reload)
	gulp.watch("./public/*.scss", ['sass'])
	gulp.watch("./public/*.ts", ['typescript'])
})

// Task to compilate Sass
gulp.task('sass', () => {
  	return gulp.src('./public/*.scss')
    	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    	.pipe(gulp.dest('./assets/css/'))
    	.pipe(browserSync.stream())
})

// Task to compilate TypeScript
gulp.task('typescript', () => {
	return gulp.src('./public/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'gb_script.js'
        }))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(browserSync.stream())
})


// Task default
gulp.task("default", ["server", "watch"])