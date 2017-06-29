var gulp = require('gulp');
var clean = require('gulp-clean');
var imageResize = require('gulp-image-resize');

var paths = {
  sources: './src/static/uploaded/*.{jpg,png}',
  destinations: {
    mobile: './src/static/resized-images/mobile',
    desktop3: './src/static/resized-images/desktop-three-columns',
    desktop8: './src/static/resized-images/desktop-eight-columns'
  }
};

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
    .pipe(gulp.dest(paths.destinations.mobile));
});

gulp.task('desktop-eight-columns', [ 'mobile' ], function () {
  return gulp.src(paths.sources)
    .pipe(imageResize({
      width : 667,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(gulp.dest(paths.destinations.desktop8));
});

gulp.task('desktop-three-columns', [ 'desktop-eight-columns' ], function () {
  return gulp.src(paths.sources)
    .pipe(imageResize({
      width : 250,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(gulp.dest(paths.destinations.desktop3));
});

gulp.task('default', [ 'desktop-three-columns' ]);