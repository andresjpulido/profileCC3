var gulp = require("gulp");
/*var pug = require("gulp-pug");
var less = require("gulp-less");
var minifyCSS = require("gulp-csso");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
*/
const htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
let cleanCSS = require('gulp-clean-css');

/*
gulp.task("html", function() {
  return gulp
    .src("client/templates/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("build/html"));
});

gulp.task("css", function() {
  return gulp
    .src("client/templates/*.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest("build/css"));
});

gulp.task("js", function() {
  return gulp
    .src("client/javascript/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/js"));
});
*/
gulp.task('minify', () => {
    return gulp.src('*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('fonts', () => {
  return gulp.src('assets/fonts/*.ttf')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('compress', function (cb) {
    pump([
          gulp.src('assets/lib/*.js'),
          uglify(),
          gulp.dest('dist')
      ],
      cb
    );
  });

//gulp.task("default", ["html", "css", "js"]);
gulp.task("default", ["minify", "compress", "minify-css", "fonts"]);