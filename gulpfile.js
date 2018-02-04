var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./styles/**')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});


gulp.task('sass:watch', function () {
    gulp.watch('./styles/**', ['sass']);
});


gulp.task('default', [ 'sass' ]);