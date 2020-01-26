var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require('del');

gulp.task('default', function () {
    return gulp.src('./src/config/*.json')
        .pipe(gulp.dest('./build/src/config'));
});

gulp.task('clean:folders', function () {
    return del([
        'build/**/*'
    ]);
});