var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');
var uglifyjs = require('gulp-uglifyjs');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var dest = 'build';

// JS hint task
gulp.task('process-js', function() {
	//ONly looking at one file
	//Looks like concatenation
  gulp.src([ 'src/public/js/*.js', 'src/modules/**/*.js', 'src/service/**/*.js', 'src/routes/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish))
    //.pipe(uglifyjs())
    .pipe(gulp.dest(dest));
});

//Working
gulp.task('copy-unchanged-content', function(){
	gulp.src([
			'src/public/images/*', //Public Images
			'src/bin/*', //Runtime files
			'src/views/*', //Jade files
			'src/routes/*', //Routes
			'src/service/*', //Web Service Connector
			'src/modules/**/*', //Modules
			'src/app.js' // Express App.js file
		])
	.pipe(copy(dest, {prefix : 1}))
	.pipe(livereload({reloadPage : '/'}));
});


 
gulp.task('sass', function () {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest))
    .pipe(livereload({reloadPage : '/'}));
});

gulp.task('build',['process-js', 'copy-unchanged-content', 'sass'], function(){});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('src/**/*', ['build']);
});

gulp.task('default',['build','watch'], function() {
  // place code for your default task here
});