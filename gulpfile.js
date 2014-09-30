var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    less        = require('gulp-less'),
    cssmin      = require('gulp-cssmin'),
    uncss       = require('gulp-uncss'),
    concat      = require('gulp-concat'),
    lint        = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename');


// Our main javascript task
gulp.task('javascript', function(){
    // source files, so any js file located under the js directory.
    return gulp.src('./src/js/**/*.js')
    // lets lint the contents
    .pipe(lint())
    // report any errors or warnings
    .pipe(lint.reporter('default'))
    // init our source maps
    .pipe(sourcemaps.init())
        // concat all of the js files into one file
        .pipe(concat('app.min.js'))
        // minify js
        .pipe(uglify())
        // peoperly close our stream if there are any errors
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
    // create the sourcemaps
    .pipe(sourcemaps.write('./'))
    // save the minified/concat js to the destination directory
    .pipe(gulp.dest('./dist/js/'))
    // reload the page.
    .pipe(connect.reload());
});


// CSS task
gulp.task('css', function(){
    // main  less entry point
    gulp.src('./src/less/styles.less')
    // run them through the less task
    .pipe(less())
    // properly close our stream if there are any errors
    .on('error', function(err){
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(rename('styles.css'))
    // save the css file to the destination
    .pipe(gulp.dest('./dist/css/'))
});

// uncss task
gulp.task('optimizecss', ['css'], function(){
    return gulp.src('./dist/css/styles.css')
    // rip out all unused css by rendering index.html and seeing what classes are used
    .pipe(uncss({
        html: ['dist/index.html']
    }))
    // source map init
    .pipe(sourcemaps.init())
        // min the css
        .pipe(cssmin())
    // write out the source maps
    .pipe(sourcemaps.write('./'))
    // save the file
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());

});

// markup task
gulp.task('html', function(){
    // look at any html files
    gulp.src('./src/**/*.html')
    // copy them to the destination
    .pipe(gulp.dest('./dist/'))
    // reload the page.
    .pipe(connect.reload());
})

// Start the sebserver for testing
gulp.task('webserver', function(){
    // start up the connect server, use livereload and set the directory to the distro directory.
    return connect.server({
        root: './dist',
        livereload : true
    });
});

// Our watcher task, has a dependency on html, javascript, css, meaning it will run these tasks before it initially starts
gulp.task('watch', ['html', 'javascript', 'optimizecss'], function() {
    // setup the css watcher and watch for any changes to the less files
    var cssWatcher = gulp.watch(['./src/less/**/*.less'], ['css']);
        cssWatcher.on('change', function (event) {
            console.log(event.path.replace(__dirname,'') + ' was ' + event.type + ', building css...');
        });

    // setup the javascript watcher watch for any changes and log what changed to the console.
    var jsWatcher = gulp.watch(['./src/js/**/*.js'], ['javascript']);
        jsWatcher.on('change', function (event) {
            console.log(event.path.replace(__dirname,'') + ' was ' + event.type + ', building scripts...');
        });

    // watch the html files
    var markupWatcher = gulp.watch(['./src/**/*.html'], ['html']);
        markupWatcher.on('change', function (event) {
            console.log(event.path.replace(__dirname,'') + ' was ' + event.type + ', markup stuffs...');
        });
});


// default task starts the webserver and the watcher which will in turn run all of our other tasks to begin with.
gulp.task('default', ['watch', 'webserver']);