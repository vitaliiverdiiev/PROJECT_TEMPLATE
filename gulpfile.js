const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const gcmq = require('gulp-group-css-media-queries');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

// ********** F U N C T I O N S ********** //
function swallowError(error) {
	// If you want details of the error in the console
	console.log(error.toString())
	this.emit('end')
  }

// ********** S W I T C H E R S ********** //
const isDev = process.argv.includes('--dev');
const isProd = !isDev;
const isSync = process.argv.includes('--sync');

// ********** P A T H S ********** //
const paths = {
	src: {
		html: `src/*.html`,
		htmls: `src/**/*.html`,
		styles: `src/scss/**/*.scss`,
		fonts: `src/fonts/*.woff`,
		img: `src/images/**/*`,
		scripts: `src/javascript/**/*.js`,
	},
	build: {
		root: 'build/',
		html: `build/`,
		styles: `build/styles`,
		fonts: `build/fonts`,
		img: `build/images`,
		scripts: `build/scripts`,
	},
};

// ********** H T M L ********** //
const html = async () => {
	gulp.src(paths.src.html)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
		.on('error', swallowError)
		.pipe(gulp.dest(paths.build.html));
}
// .pipe(gulpIf(isSync, browserSync.stream()))

// ********** S T Y L E S ********** //
const styles = () =>
	gulp
		.src(paths.src.styles)
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(gcmq())
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(
			gulpIf(
				isProd,
				cleanCSS({
					level: 2,
				}),
			),
		)
		.pipe(gulpIf(isDev, sourcemaps.write()))
		.pipe(gulp.dest(paths.build.styles));
// .pipe(gulpIf(isSync, browserSync.stream()))

// ********** I M A G E S ********** //

const img = () =>
	gulp
		.src(paths.src.img)
		.pipe(
			gulpIf(
				isProd,
				imagemin([
					imagemin.mozjpeg({ quality: 50, progressive: true }),
					imagemin.optipng({ optimizationLevel: 7 }),
				]),
			),
		)
		.pipe(gulp.dest(paths.build.img));

// ********** F O N T S ********** //

const fonts = () =>
	gulp
		.src(paths.src.fonts)
		.pipe(gulp.dest(paths.build.fonts));

// ********** J A V A S C R I P T ********** //

// const jsFiles = ['./src/js/index.js', './src/js/burger.js', './src/js/animation.js'];
const jsFiles = ['./src/javascript/index.js', './src/javascript/burger.js', './src/javascript/animation.js'];
const js = () =>
	gulp
		.src(jsFiles)
		.pipe(concat('index.js'))
		.pipe(minify())
		.pipe(gulp.dest(paths.build.scripts))
		.pipe(gulpIf(isSync, browserSync.stream()));

// ********** W A T C H E R ********** //

const watch = () => {
	gulp.watch(paths.src.styles, styles);
	gulp.watch(paths.src.htmls, html);
	gulp.watch(paths.src.img, img);
	gulp.watch(paths.src.fonts, fonts);
	gulp.watch(paths.src.scripts, js);

	if (isSync) {
		return browserSync.init({
			server: {
				baseDir: './build/',
			},
			files: [
				{
					match: './build/',
					fn: this.reload,
				},
			],
		});
	}
};

// ********** C L E A N ********** //
const clean = () => del(`${paths.build.root}*`);

// ********** T A S K S ********** //
gulp.task('clean', clean);
gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('fonts', fonts);
gulp.task('img', img);
gulp.task('js', js);

// ********** F I N A L - T A S K S ********** //
const build = gulp.series(
	'clean',
	gulp.parallel('html', 'styles', 'fonts', 'img', 'js'),
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
