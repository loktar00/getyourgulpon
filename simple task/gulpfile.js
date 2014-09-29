var gulp        = require('gulp');

gulp.task('task1', function(){
    console.log('task 1');
});

gulp.task('task2', ['task1'], function(){
    console.log('task 2');
});

gulp.task('default', ['task1', 'task2'], function(){
    console.log('task 3');
});