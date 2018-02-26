'use strict';

const gulp        = require('gulp');
const babel = require("gulp-babel");
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const removeFiles = require('gulp-remove-files');

gulp.task('images', function () {
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clearImages', function () {
    return gulp.src('dist/images/*')
        .pipe(removeFiles())
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('clearFonts', function () {
    return gulp.src('dist/fonts/*')
        .pipe(removeFiles())
});

gulp.task('js', function () {
    return gulp.src('app/js/*')
        .pipe(gulp.dest('dist/js/'))
});
gulp.task('clearjs', function () {
    return gulp.src('dist/js/*')
        .pipe(removeFiles())
});

gulp.task('sasstocss', function() {
    return gulp.src('app/sass/styles.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 3%'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('jsbabel', function() {
    return gulp.src('app/js/main.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('css', function() {
    return gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['> 3%'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', gulp.series('sasstocss', 'clearFonts', 'fonts','clearjs','js','clearImages', 'images', function () {
    browserSync.init({
        server: true,
        browser: "firefox",
        startPath: "index.html",
        notify: false
    });
    gulp.watch('app/sass/**/*.*', gulp.series('sasstocss'));
    gulp.watch('app/fonts/**/*.*', gulp.series('clearFonts','fonts'));
    gulp.watch('app/js/**/*.*', gulp.series('clearjs','js'));
    gulp.watch('app/images/**/*.*', gulp.series('clearImages', 'images'));
    browserSync.watch(['*.html','dist/**/*.js','app/images/*.*','dist/**/*.css','dist/fonts/**/*.*']).on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('images', 'css', 'jsbabel'));
