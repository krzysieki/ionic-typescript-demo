var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var typescript = require('gulp-tsc');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require("gulp-uglify");
var gulpsync = require('gulp-sync')(gulp);
var minifyHTML = require('gulp-minify-html');


var paths = {
  sass: ['./www/scss/**/*.scss'],
  typescript: ['./www/scripts/**/*.ts']
};

gulp.task('compile', compileTypeScript);
gulp.task('default', ['debug']);
gulp.task('release', gulpsync.sync(['minifyHtml', 'sass', 'compile', 'minifyJs']));
gulp.task('debug', ['sass', 'compile']);


gulp.task('minifyJs', function (done) {
  gulp.src('./www/js/tslib.js')
    .pipe(ngAnnotate({
      remove: true,
      add: true,
      single_quotes: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});


gulp.task('minifyHtml', function (done) {
  gulp.src('./www/views/*')
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('./www/views/min'))
    .on('end', done);
});


gulp.task('sass', function (done) {
  gulp.src('./www/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

function compileTypeScript(done) {
  gulp.src(paths.typescript)
    .pipe(typescript({ sourcemap: true, out: 'tslib.js', sourceRoot: '../scripts' }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);
}

gulp.task('watch', function () {
  compileTypeScript();
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.typescript, ['compile']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});