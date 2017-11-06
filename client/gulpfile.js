var gulp          = require('gulp');
var sass          = require('gulp-sass');

gulp.task('serve', function() {
    return gulp.watch(["./src/sass/**/*.{scss,sass}", "./bower_components/styles/sass/**/*.{scss,sass}"], ['sass']); //Add here your lib folders
});

gulp.task('sass', function() {
  return gulp.src("./src/sass/**/*.{scss,sass}")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['sass', 'serve']);