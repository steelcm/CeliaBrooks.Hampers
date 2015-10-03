/// <reference path="typings/tsd.d.ts" />
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var typeScript = require('gulp-typescript');
var jade = require('gulp-jade');
var watchFiles = ["app.js", "routes/*.js", "views/*.jade", "assets/sass/**/*.scss", "assets/scripts/**/*.ts"];
gulp.task('default', ['browser-sync', 'styles-watch', 'styles-build', 'js-watch', 'js-build', 'html-watch', 'html-build'], function () { });
gulp.task('browser-sync', ['nodemon'], function () {
    console.log("executed");
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: watchFiles,
        browser: "google chrome",
        port: 7000,
        reloadDelay: 1000
    });
});
gulp.task('nodemon', function (cb) {
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
gulp.task('html-build', function () {
    gulp.src('assets/pages/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/pages/'));
});
gulp.task('html-watch', function () {
    gulp.watch('assets/pages/**/*.jade', ['html-build']);
});
gulp.task('styles-build', function () {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});
gulp.task('styles-watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['styles-build']);
});
var jsServerFiles = ['**/*.ts', '!**/*.d.ts', '!node_modules/**/*.ts', '!assets/**/*.ts'];
var jsClientFiles = ['assets/**/*.ts'];
gulp.task('js-build', function () {
    gulp.src(jsServerFiles)
        .pipe(typeScript());
    var jsClientOutput = gulp.src(jsClientFiles)
        .pipe(typeScript());
    return jsClientOutput.js.pipe(gulp.dest('public'));
});
gulp.task('js-watch', function () {
    gulp.watch(['**/*.ts', '!**/*.d.ts', '!node_modules/**/*.ts'], ['js-build']);
});
//# sourceMappingURL=gulpfile.js.map