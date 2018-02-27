import gulp from 'gulp';
import mocha from 'gulp-mocha';

const paths = {
  test: ['./mocha.conf.js', './specs/**/*.js'],
};

gulp.task('test', ['test:unit']);

gulp.task('test:unit', () => {
  gulp.src(paths.test, {read: false})
    .pipe(mocha({
      reporter: 'nyan', exit: true,
    }));
});

gulp.task('default', ['watch']);
