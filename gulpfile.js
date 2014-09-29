var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    less        = require('gulp-less'),
    concat      = require('gulp-concat'),
    lint        = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename');


gulp.task('javascript', function(){
    gulp.src('./src/js/**.js')
    .pipe(lint())
    .pipe(lint.reporter('default'))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});


// default task
gulp.task('default', ['javascript']);