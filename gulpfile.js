const { src, dest, series, watch } = require('gulp');

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const clean = () => {
  return del('dist');
};

const resources = () => {
  return src('src/resources/**').pipe(dest('dist'));
};

const styles = () => {
  return (
    src('src/styles/**/*.css')
      .pipe(sourceMaps.init())
      .pipe(concat('main.css'))
      .pipe(dest('dist'))
      .pipe(browserSync.stream())
  );
};

const stylesBuild = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest('dist'));
};

const woff = () => {
  return src('src/fonts/**/*.ttf').pipe(ttf2woff()).pipe(dest('dist/fonts'));
};

const woff2 = () => {
  return src('src/fonts/**/*.ttf').pipe(ttf2woff2()).pipe(dest('dist/fonts'));
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};


const scripts = () => {
  return src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(sourceMaps.init())
    .pipe(concat('main.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return src(['src/js/components/**/*.js', 'src/js/main.js'])

    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('main.js'))
    .pipe(
      uglify({
        toplevel: true,
      }).on('error', notify.onError())
    )
    .pipe(dest('dist'));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
};

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
    'src/images/**/*.svg',
    'src/images/*.ico',
  ])
    .pipe(image())
    .pipe(dest('dist/images'));
};

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;

exports.default = series(
  clean,
  resources,
  woff,
  woff2,
  htmlMinify,
  scripts,
  styles,
  images,
  watchFiles
);

exports.build = series(
  clean,
  resources,
  woff,
  woff2,
  htmlMinify,
  scriptsBuild,
  stylesBuild,
  images,
  watchFiles
);
exports.dev = series(
  clean,
  resources,
  scripts,
  woff,
  woff2,
  htmlMinify,
  styles,
  images,
  watchFiles
);
