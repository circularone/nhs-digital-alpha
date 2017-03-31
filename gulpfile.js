'use strict';

// Dependencies

var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	jshint 		= require('gulp-jshint'),
	useref 		= require('gulp-useref'),
	cssnano 	= require('gulp-cssnano'),
	gulpIf 		= require('gulp-if'),
	gulputil 	= require('gulp-util'),
	sourcemaps 	= require('gulp-sourcemaps'),
	flatten 	= require('gulp-flatten'),
	strip 		= require('gulp-strip-comments'),
	sass 		= require('gulp-sass'),
	sftp 		= require('gulp-sftp'),
	ignore 		= require('gulp-ignore'),
	htmlify 	= require('gulp-angular-htmlify'),
	watch 		= require('gulp-watch'),
	webserver 	= require('gulp-webserver'),
	sequence 	= require('run-sequence');

// Paths

var paths = {
	sass: [
		'source/css/**/*.scss'
	],
	html: [
		'source/**/*.html'
	],
	js: [
		'node_modules/chart.js/dist/Chart.bundle.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-sanitize/angular-sanitize.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/angular-chart.js/dist/angular-chart.min.js',
		'node_modules/svgxuse/svgxuse.min.js'
	],
	ng: [
		'source/nhs.module.js',
		'source/ngs.config.js',
		'source/nhs.run.js',
		'source/**/*.js'
	],
	css: [
		'source/main/css/reset.css',
		'source/main/css/fonts.css',
		'source/**/*.css'
	]
};

// Build CSS

gulp.task('css', function() {
	return gulp.src(paths.css)
		.pipe(sourcemaps.init())
		.pipe(concat('styles.min.css'))
		.pipe(cssnano({zindex: false}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dist/assets/css'));
});

// Concatenate JS dependencies

gulp.task('js', function () {
	return gulp.src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(strip())
		.pipe(concat('bundle.min.js'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dist/assets/js'));
});

// Add "data-" to angular attributes in html templates

gulp.task('html', function() {
	return gulp.src(paths.html)
		.pipe(ignore.exclude('source/index.html'))
		.pipe(htmlify({
			customPrefixes: [
				'ui-'
			]
		}))
		.pipe(flatten())
		.pipe(gulp.dest('dist/views'));
});

// Add "data-" to angular attributes in index.html

gulp.task('index', function() {
	return gulp.src(['source/index.html'])
		.pipe(htmlify({
			customPrefixes: [
				'ui-'
			]
		}))
		.pipe(flatten())
		.pipe(gulp.dest('dist'));
});


// Concatenate and minify angular app

gulp.task('ng', function() {
	return gulp.src(paths.ng)
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dist/assets/js'));
});


// JS lint for angular app

gulp.task('jslint', function() {
	return gulp.src(paths.ng)
		.pipe(jshint({esversion: 6}))
		.pipe(jshint.reporter('default'));
});

// Watch for file changes and rebuild

gulp.task('watch', function () {
    gulp.watch(paths.css, ['css'])
    gulp.watch(paths.ng, ['ng'])
    gulp.watch(paths.html, ['html'])
    gulp.watch('source/index.html', ['index'])
});

// Run app in default browser and reload on file changes

gulp.task('webserver', ['watch'], function() {
	gulp.src('dist')
	.pipe(webserver({
		livereload: true,
		directoryListing: false,
		open: true,
		fallback: 'index.html'
	}));
});

// Build app and run in browser

gulp.task('build', function() {
	sequence(
        [
        	'js', 
        	'ng', 
        	'html', 
        	'index'
        ],
        'webserver'
    );
});