var gulp = require('gulp');
var clean = require('gulp-clean');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');

var paths = {
  sources: './src/static/uploaded/*.{jpg,png}',
  destination: './src/static/resized-images'
}

gulp.task('clean', function() {
  return gulp.src(paths.destination + '/*')
        .pipe(clean());
});

gulp.task('mobile', [ 'clean' ], function () {
  return gulp.src(paths.sources)
    .pipe(imageResize({
      width : 750,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(rename(function (path) { path.basename += '-mobile'; }))
    .pipe(gulp.dest(paths.destination));;
});

gulp.task('desktop-eight-columns', [ 'mobile' ], function () {
  return gulp.src(paths.sources)
    .pipe(imageResize({
      width : 667,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(rename(function (path) { path.basename += '-desktop-eight-columns'; }))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('desktop-three-columns', [ 'desktop-eight-columns' ], function () {
  return gulp.src(paths.sources)
    .pipe(imageResize({
      width : 250,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(rename(function (path) { path.basename += '-desktop-three-columns'; }))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('default', [ 'desktop-three-columns' ]);