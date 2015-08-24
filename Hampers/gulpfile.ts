import gulp = require('gulp');
import sass = require('gulp-sass');
import nodemon = require('gulp-nodemon');
import browserSync = require('browser-sync');

var watchFiles = ["app.js", "routes/*.js", "views/*.jade", "assets/sass/**/*.scss"];

gulp.task('default', ['browser-sync', 'styles-watch'], () => { });

gulp.task('browser-sync', ['nodemon'], () => {
    console.log("executed");
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: watchFiles,
        browser: "firefox",
        port: 7000,
        reloadDelay: 1000
    });
});

gulp.task('nodemon', (cb) => {
    var started = false;

    return nodemon({
        script: 'app'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('styles', () => {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('styles-watch', () => {
    gulp.watch('assets/sass/**/*.scss', ['styles']);
});
