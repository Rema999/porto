const gulp = require('gulp');
const gulpLess = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const del = require('del');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const pathLess = './src/less/*.less';
const pathCss = './build/css';
const Jsfiles = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/owl.carousel/dist/owl.carousel.js',
    './src/javaScript/slider.js',
    './src/javaScript/script.js',
];

function less() {
    return gulp.src(pathLess)
        .pipe(sourcemaps.init())
        .pipe(gulpLess({
            paths: [path.join('./css', 'less', 'includes')]
        }))
        .pipe(cleanCss({
            level: 0
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(pathCss));
}

function clean() {
    return del(['css/*'])
}

function scripts() {
    return gulp.src(Jsfiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/js'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(pathLess, less);
    gulp.watch(Jsfiles, scripts);
    gulp.watch('./*.html', browserSync.reload);
}

gulp.task('less', less);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, less))
gulp.task('scripts', scripts);