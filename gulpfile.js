const gulp = require('gulp');
const gulpLess = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const del = require('del');
const browserSync = require('browser-sync');

var ghPages = require('gulp-gh-pages');

const pathLess = './less/*.less';
const pathCss = './css';

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

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});
gulp.task('less', less);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, less))