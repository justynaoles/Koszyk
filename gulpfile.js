//variables
'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');



//Tasks
gulp.task('hello', gulp.series((done) => {

  console.log('Dodawaj, usuwaj, kupuj :)');
  done();

}));


gulp.task('browserSync', () => {

  browserSync.init({
    server: {
      baseDir: './',
      open: true,
    },
  });
  gulp.watch('index.html').on('change', browserSync.reload);
});

sass.compiler = require('node-sass');

gulp.task('sass', () => {

  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('cleanCss', () => {

  return gulp.src('src/css/style.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass', 'browserSync', 'watch'));


