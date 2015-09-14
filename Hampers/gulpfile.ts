/// <reference path="typings/tsd.d.ts" />

import gulp = require('gulp');
import sass = require('gulp-sass');
import nodemon = require('gulp-nodemon');
import browserSync = require('browser-sync');
import typeScript = require('gulp-typescript');
import jade = require('gulp-jade');

var watchFiles = ["app.js", "routes/*.js", "views/*.jade", "assets/sass/**/*.scss", "assets/scripts/**/*.ts"];

gulp.task('default', ['browser-sync', 'styles-watch', 'styles-build', 'js-watch', 'js-build', 'html-watch', 'html-build'], () => { });

gulp.task('browser-sync', ['nodemon'], () => {
    console.log("executed");
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: watchFiles,
        browser: "google chrome",
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

gulp.task('html-build', () => {
    gulp.src('assets/pages/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/pages/'));
});

gulp.task('html-watch', () => {
    gulp.watch('assets/pages/**/*.jade', ['html-build']);
});

gulp.task('styles-build', () => {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('styles-watch', () => {
    gulp.watch('assets/sass/**/*.scss', ['styles-build']);
});


var jsServerFiles = ['**/*.ts', '!**/*.d.ts', '!node_modules/**/*.ts', '!assets/**/*.ts'];
var jsClientFiles = ['assets/**/*.ts'];
gulp.task('js-build', () => {
    gulp.src(jsServerFiles)
        .pipe(typeScript());
    var jsClientOutput = gulp.src(jsClientFiles)
        .pipe(typeScript());
    return jsClientOutput.js.pipe(gulp.dest('public'));
});

gulp.task('js-watch', () => {
    gulp.watch(['**/*.ts', '!**/*.d.ts', '!node_modules/**/*.ts'], ['js-build'])
});
