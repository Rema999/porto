const gulp = require('gulp');
const gulpLess = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const del = require('del');
const browserSync = require('browser-sync');
var concat = require('gulp-concat');




const pathLess = './less/*.less';
const pathCss = './build/css';
const Jsfiles = [
    './node_modules/jquery/dist/jquery.js',
    './javaScript/map.js',
    './node_modules/owl.carousel/dist/owl.carousel.js',
    './node_modules/mediaCheck/js/mediaCheck-min.js',
    './javaScript/script.js',
];




function less() {
    return gulp.src(pathLess)
        .pipe(sourcemaps.init())
        .pipe(gulpLess({
            paths: [ path.join('./css', 'less', 'includes') ]
        }))

        .pipe(cleanCss({
            level: 0
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(pathCss));
}

function watch() {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    gulp.watch(pathLess, less);
    gulp.watch('./*.html', browserSync.reload);
}

function clean() {
    return del(['css/*'])
}

function scripts() {
    return  gulp.src(Jsfiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/js'))
}








gulp.task('less', less);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, less))
gulp.task('scripts', scripts);