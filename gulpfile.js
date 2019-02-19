// Require Packages
const {series, parallel, watch, src, dest} = require('gulp'),
    plumber       = require('gulp-plumber'),
    del           = require('delete'),
    child         = require('child_process'),   
    concat        = require('gulp-concat'),
    cssmin        = require('gulp-cssmin'),
    rename        = require('gulp-rename'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
    include       = require('gulp-include'),
    sass          = require('gulp-sass'),
    sassGlob      = require('gulp-sass-glob'),
    postcss       = require('gulp-postcss'), 
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync');


// Clean task
function clean (){
    return del( ['./dist/assets/css/*.css'] );
    return del( ['./dist/assets/js/*.js'] );
    return del( ['./dist/*.html'] );
}


// Styles task
function styles (){
    return src('./src/_assets-src/scss/*.scss')
    // .pipe(plumber(function(error) {
    //   gutil.log(gutil.colors.red(error.message));
    //   this.emit('end');
    // }))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({
      browsers: ['last 3 versions'],
      grid: true
    }) ]))
    .pipe(dest('./src/assets/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./src/assets/css/'));
}


// JS task
function scripts (){
    return src([
        './src/_assets-src/js/plugins.js', 
        './src/_assets-src/js/main.js'
      ])
      .pipe(jshint())
      .pipe(include())
        .on('error', console.log)
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(dest('./src/assets/js/'));
}


// Watch Task
function watchFiles (){
  watch('./src/_assets-src/js/*.js', scripts);
  watch('./src/_assets-src/scss/**/*.scss', styles);
}


// Jekyll Task
function jekyll (){
    const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

//   const jekyllLogger = (buffer) => {
//     buffer.toString()
//       .split(/\n/)
//       .forEach((message) => gutil.log('Jekyll: ' + message));
//   };

//   jekyll.stdout.on('data', jekyllLogger);
//   jekyll.stderr.on('data', jekyllLogger);
}


//Serve task
function serve (){
    browserSync.init({
        files: ["./dist" + '/**'],
        port: 4000,
        server: {
          baseDir: "./dist"
        }
      });
      
    watch('./dist/*.html').on('change', browserSync.reload);
    watch('./dist/assets/css/*.css').on('change', browserSync.reload);
    watch('./dist/assets/js/*.js').on('change', browserSync.reload);
}


exports.build = series(clean, parallel(styles, scripts, jekyll));
exports.default = series(clean, parallel(styles, scripts, jekyll, serve, watchFiles));
