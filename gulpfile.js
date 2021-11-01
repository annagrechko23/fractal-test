'use strict';

const gulp         = require('gulp');
const fractal      = require('./fractal.config.js');
const logger       = fractal.cli.console;
const sass = require('gulp-sass')(require('sass'));
const sassGlob     = require('gulp-sass-glob');
const concat      = require('gulp-concat');
const uglify       = require('gulp-uglify');
const path         = require('path');
const browserSync  = require('browser-sync');
// Specific Task
function gulpSass() {
    return gulp
    .src(['assets/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
}
gulp.task(gulpSass);

function gulpJs() {
    return gulp
    .src(['assets/*.js'])
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
}
gulp.task(gulpJs);


gulp.task('watch', function(){
    gulp.watch('assets/scss/**/*.scss', gulp.series('gulpSass'));
    gulp.watch('assets/*.js', gulp.series('gulpJs'));

});
gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});



gulp.task('default', gulp.series('fractal:start', 'gulpSass', 'watch', function() {  // change here
    console.log('Build completed. Output in manifest folder');
}));