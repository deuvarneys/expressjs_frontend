var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');
var uglifyjs = require('gulp-uglifyjs');
var copy = require('gulp-copy');
var dest = 'build';

// JS hint task
gulp.task('process-js', function() {
	//ONly looking at one file
	//Looks like concatenation
  gulp.src(['src/routes/*.js', 'src/**/*.js', 'src/public/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish))
    .pipe(uglifyjs())
    .pipe(gulp.dest(dest));
});

//Working
gulp.task('copy-unchanged-content', function(){
	gulp.src([
			'src/public/images/*', //Public Images
			'src/bin/*', //Runtime files
			'src/views/*' //Jade files
		])
	.pipe(copy(dest, {prefix : 1}))
});

gulp.task('build',['process-js', 'copy-unchanged-content'], function(){})

gulp.task('watch', function(){
	gulp.watch('src/**/*', ['build']);
});

gulp.task('default',['watch'], function() {
  // place code for your default task here
});