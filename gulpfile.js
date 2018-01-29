// Require Packages
const gulp        = require('gulp'),
    plumber       = require('gulp-plumber'),
    child         = require('child_process'),
    gutil         = require('gulp-util'),    
    concat        = require('gulp-concat'),
    cssmin        = require('gulp-cssmin'),
    rename        = require('gulp-rename'),
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish'),
    uglify        = require('gulp-uglify'),
    include       = require('gulp-include'),
    sass          = require('gulp-sass'),
    sassGlob      = require('gulp-sass-glob'),
    postcss       = require('gulp-postcss'), 
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync');


gulp.task('styles', function(){
  return gulp.src('./src/_assets-src/scss/*.scss')
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({
      browsers: ['last 3 versions'],
      grid: false 
    }) ]))
    .pipe(gulp.dest('./src/assets/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/assets/css/'));
});


gulp.task('scripts', function(){
  return gulp.src([
      './src/_assets-src/js/plugins.js', 
      './src/_assets-src/js/main.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/assets/js/'));
});


// Watch Task
gulp.task('watch', function(){
  gulp.watch('./src/_assets-src/js/*.js', ['scripts']);
  gulp.watch('./src/_assets-src/scss/**/*.scss', ['styles']);
});


//Jekyll Task
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});


//Serve task
gulp.task('serve', () => {
  browserSync.init({
    files: ["./dist" + '/**'],
    port: 4000,
    server: {
      baseDir: "./dist"
    }
  });
  
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/assets/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/assets/js/*.js').on('change', browserSync.reload);
});


// Default Task
gulp.task('default', ['styles', 'scripts', 'jekyll', 'serve', 'watch']);

// Build Task (without starting browser-sync server or watch tasks)
gulp.task('build', ['styles', 'scripts', 'jekyll']);