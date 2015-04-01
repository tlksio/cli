var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');

gulp.task('clean', function() {
    del(['node_modules', 'coverage'], function(err, delfiles) {
        return err;
    });
});

gulp.task('jshint', function() {
    gulp.src(['./lib/**/*.js', './*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint'], function() {});
