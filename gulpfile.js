const gulp = require('gulp')
const markdown = require('gulp-markdown')
const hljs = require('highlight.js')

gulp.task('default', () => {
  return gulp
    .src('./src/docs-md/**/*.md')
    .pipe(
      markdown({
        highlight: code => {
          return hljs.highlightAuto(code).value
        },
      })
    )
    .pipe(gulp.dest('./src/docs-content'))
})
