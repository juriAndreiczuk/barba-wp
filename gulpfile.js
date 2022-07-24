import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import eslint from 'gulp-eslint'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'autoprefixer'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import concat from 'gulp-concat'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import reporter from 'postcss-reporter'
import syntaxScss from 'postcss-scss'
import rename from 'gulp-rename'
import changed from 'gulp-changed'
import pkg from 'gulp'

const sass = gulpSass(dartSass)
const { src, dest, parallel, series, watch } = pkg

const browsersync = () =>
  browserSync.init({
    proxy: 'dev.testowy'
  })

const js = () => src('./src/scripts/app.js')
  .pipe(eslint({}))
  .pipe(webpackStream({
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          resolve: {
            fullySpecified: false
          },
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['babel-plugin-root-import']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ]
    }
  }, webpack))
  .pipe(rename(('app.js')))
  .pipe(dest('./dist/js'))
  .pipe(browserSync.stream())
  .pipe(eslint.format())

const styles = () => src('./src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    reporter({
      clearMessages: true,
      throwError: true
    })],
  { syntax: syntaxScss }))
  .pipe(postcss([
    autoprefixer({ grid: 'autoplace' }),
    cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
  ]))
  .pipe(plumber({
    errorHandler: console.error
  }))
  .pipe(dest('./dist/css'))
  .pipe(browserSync.stream());

const cssLibs = () => src(['./node_modules/bootstrap/dist/css/bootstrap-grid.min.css'])
  .pipe(concat('libs.css'))
  .pipe(dest('./dist/css/'))

const img = () => src('./src/img/**/*')
  .pipe(changed('./dist/img'))
  .pipe(imagemin())
  .pipe(dest('./dist/img'))
  .pipe(browserSync.stream())

const webP = () => src('./src/img/**/*')
  .pipe(changed('./dist/img'))
  .pipe(webp())
  .pipe(dest('./dist/img'))
  .pipe(browserSync.stream())

const fonts = () => src('./src/fonts/**/*')
  .pipe(changed('./dist/fonts'))
  .pipe(dest('./dist/fonts'))

const live = () => {
  watch('src/scripts/**/*.js', js)
  watch('src/styles/**/*.scss', parallel(cssLibs, styles))
  watch('src/img/**/*', parallel(img, webP))
  watch('src/fonts/**/*', fonts)
  watch('./**/*.php', { usePolling: true }).on('change', browserSync.reload)
}

export { js, styles, cssLibs, img, webP, fonts }
export const build = series(parallel(cssLibs, styles, js, img, webP, fonts))
export default series(
  parallel(cssLibs, styles, js, img, webP, fonts),
  parallel(live, browsersync)
)
