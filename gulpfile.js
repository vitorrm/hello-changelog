var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var beautify = require('gulp-html-beautify');
var clean = require('gulp-clean');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();


// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

gulp.task('clean', function () {
    return gulp.src([
      './site-root/*',
      '!./site-root/vendor'
    ], {read: false})
    .pipe(clean());
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./site-root/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './site-root/css/*.css',
      '!./site-root/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./site-root/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./site-root/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// PUG
gulp.task('pug', function buildHTML() {
  return gulp.src('./view/*.pug')
    .pipe(pug())
    .pipe(beautify())
    .pipe(gulp.dest('./site-root/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Default task
gulp.task('default', ['css', 'js', 'pug']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'pug', 'browserSync'], function() {
  gulp.watch('./view/**/*', ['pug']);
  gulp.watch('./scss/**/*.scss', ['css']);
  gulp.watch('./site-root/js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
