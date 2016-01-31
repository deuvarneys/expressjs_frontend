var gulp = require('gulp'),
jshint = require('gulp-jshint'),
jshint_stylish = require('jshint-stylish'),
uglifyjs = require('gulp-uglifyjs'),
copy = require('gulp-copy'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
istanbul = require('gulp-istanbul'),
mocha = require('gulp-mocha');

var dest = 'build';

// JS hint task
gulp.task('process-js', function() {
	//ONly looking at one file
	//Looks like concatenation
  //gulp.src([ 'src/public/js/*.js', 'src/modules/**/*.js', 'src/service/**/*.js', 'src/routes/**/*.js'])
    gulp.src([ 'src/public/js/*.js'])
    //.pipe(jshint())
    //.pipe(jshint.reporter(jshint_stylish))
    //.pipe(uglifyjs())
    .pipe(copy(dest, {prefix : 1}))
    //.pipe(gulp.dest(dest));
});

gulp.task('lint-js', function(){
	gulp.src(['src/**/*.js'])
	.pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish))
});

//Working
gulp.task('copy-unchanged-content', function(){
	gulp.src([
			'src/public/images/*', //Public Images
			'src/bin/*', //Runtime files
			'src/views/**/*', //Jade files
			'src/routes/*', //Routes
			'src/service/**/*', //Web Service Connector
			'src/modules/**/*', //Modules
			'src/app.js' // Express App.js file
		])
	.pipe(copy(dest, {prefix : 1}));
	//.pipe(livereload({reloadPage : '/'}));
});


 
gulp.task('sass', function () {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest))
    .pipe(livereload({reloadPage : '/'}));
});

gulp.task('coverage', function () {
  return gulp.src(['src/**/*.js'])
    // Covering files
    .pipe(istanbul({includeUntested : true}))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('unit-test', ['coverage'], function () {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha({
            "reporter": "mocha-jenkins-reporter",
            "reporterOptions": {
                "junit_report_name": "Unit_Test_Results",
                "junit_report_path": "unit_tests/report.xml",
                "junit_report_stack": 1
            }
        }))
    
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports());
    // Enforce a coverage of at least 90%
    //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('mocha',function() {
    return gulp.src('test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'xunit'}))
        .on("error", function(err){
        	console.log("ERROR:", err.toString());
        });
});

gulp.task('build',['lint-js','process-js', 'copy-unchanged-content', 'sass'], function(){});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('src/**/*', ['build']);
});

gulp.task('coverage-watch', function(){
	livereload.listen();
	gulp.watch('src/**/*', ['unit-test', 'build']);
});

gulp.task('default',['build','watch'], function() {
  // place code for your default task here
});

gulp.task('build-dev', ['unit-test', 'build'], function(){
});
