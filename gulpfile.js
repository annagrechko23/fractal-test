'use strict';

const gulp         = require('gulp');
const fractal      = require('./fractal.config.js');
const logger       = fractal.cli.console;
const sass = require('gulp-sass')(require('sass'));
const sassGlob     = require('gulp-sass-glob');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
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


gulp.task('watch', function(){
    gulp.watch('assets/scss/**/*.scss', gulp.series('gulpSass'));
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