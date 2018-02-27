import gulp from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import path from 'path';
import del from 'del';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import shell from 'gulp-shell';

const paths = {
  srcPath: './src/**/*.*',
  src: ['./src/**/*.js', '!./src/**/*.json'],
  dist: './dist',
  unitTests: ['./test/unit/**/*.js'],
  test: ['./test/**/*.js', '!./test/integration/node_modules/**/*'],
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, 'src')
};

gulp.task('clean:dist', () => {
  return del([
    './dist/**/*'
  ]);
});

gulp.task('build', ['clean:dist', 'copy:nonJs'], () => {
  return gulp.src(paths.src)
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourceMaps.write('.', {sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.dist));
});

// Copy all the non JavaScript files to the ./dist folder
gulp.task('copy:nonJs', () => {

  return gulp.src([paths.srcPath, '!' + paths.src])
    .pipe(gulp.dest(paths.dist))

});

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.src, ['build']);
});

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.src, ['build']);
});

gulp.task('default', ['watch']);

gulp.task('test', ['test:unit']);

gulp.task('test:unit', () => {
  gulp.src(paths.unitTests, {read: false})
    .pipe(mocha({
      reporter: 'nyan', exit: true,
    }));
});

gulp.task('test:unit:ci', () => {
  gulp.src(paths.unitTests, {read: false})
    .pipe(mocha({
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: './tmp/tests.xml',
      },
      exit: true,
    }));
});

gulp.task('test:integration', shell.task('cd test/integration && bash test.sh'));

gulp.task('lint', ['lint:src', 'lint:test']);

gulp.task('lint:src', () => {
  return gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:test', () => {
  return gulp.src(paths.test)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
