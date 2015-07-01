var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var typescript = require('gulp-tsc');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./www/scss/**/*.scss'],
  typescript: ['./www/scripts/**/*.ts']
};

gulp.task('default', ['sass', 'compile']);


function compileTypeScript(done) {
  gulp.src(paths.typescript)
    .pipe(typescript({sourcemap: true, out: 'tslib.js', sourceRoot: '../scripts'}))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);

}

gulp.task('compile', compileTypeScript);

gulp.task('sass', function(done) {
  gulp.src('./www/scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  compileTypeScript();
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.typescript, ['compile']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
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
