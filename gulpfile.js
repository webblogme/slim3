/**
 * Gulpfile.
 *
 * Gulp with WordPress.
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *      4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *      5. Watches files for changes in CSS or JS.
 *      6. Watches files for changes in PHP.
 *      7. Corrects the line endings.
 *      8. InjectCSS instead of browser page reload.
 *      9. Generates .pot file for i18n and l10n.
 *
 * @author Ahmad Awais (@ahmadawais)
 * @version 1.0.3
 */

/**
 * Configuration.
 *
 * Project Configuration for gulp tasks.
 *
 * In paths you can add <<glob or array of globs>>. Edit the variables as per your project requirements.
 */

// START Editing Project Variables.
// Project related.
var project                 = 'SLIM'; // Project Name.
var projectURL              = 'localhost'; // Local project URL of your already running WordPress site. Could be something like local.dev or localhost:8888.
var productURL              = './'; // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.

// Translation related.
//var text_domain             = 'WPGULP'; // Your textdomain here.
//var translationFile         = 'WPGULP.pot'; // Name of the transalation file.
//var translationDestination  = './languages'; // Where to save the translation files.
//var packageName             = 'WPGULP'; // Package name.
//var bugReport               = 'https://AhmadAwais.com/contact/'; // Where can users report bugs.
//var lastTranslator          = 'Ahmad Awais <your_email@email.com>'; // Last translator Email ID.
//var team                    = 'WPTie <your_email@email.com>'; // Team's Email ID.

// Style related.
//var styleSRC                = './assets/css/style.scss'; // Path to main .scss file.
//var styleDestination        = './'; // Path to place the compiled CSS file.
// Default set to root folder.

// JS Vendor related.
//var jsVendorSRC             = './assets/js/vendor/*.js'; // Path to JS vendor folder.
//var jsVendorDestination     = './assets/js/'; // Path to place the compiled JS vendors file.
//var jsVendorFile            = 'vendors'; // Compiled JS vendors file name.
// Default set to vendors i.e. vendors.js.

// JS Custom related.
//var jsCustomSRC             = './assets/js/custom/*.js'; // Path to JS custom scripts folder.
//var jsCustomDestination     = './assets/js/'; // Path to place the compiled JS custom scripts file.
//var jsCustomFile            = 'custom'; // Compiled JS custom file name.
// Default set to custom i.e. custom.js.

// Images related.
//var imagesSRC               = './assets/img/raw/**/*.{png,jpg,gif,svg}'; // Source folder of images which should be optimized.
//var imagesDestination       = './assets/img/'; // Destination folder of optimized images. Must be different from the imagesSRC folder.

// Watch files paths.
//var styleWatchFiles         = './assets/css/**/*.scss'; // Path to all *.scss files inside css folder and inside them.
//var vendorJSWatchFiles      = './assets/js/vendor/*.js'; // Path to all vendor JS files.
//var customJSWatchFiles      = './assets/js/custom/*.js'; // Path to all custom JS files.
//var projectPHPWatchFiles    = './**/*.php'; // Path to all PHP files.

var projectFolder = './www/public/';

var projectPHPWatchFiles = [
	'./www/app/**/*.php',
	'./www/bootstrap/**/*.php',
	'./www/build/**/*.php',
	'./www/public/**/*.php',
	'./www/resources/**/*.php',
	];

// Browsers you care about for autoprefixing.
// Browserlist https        ://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
  ];

// STOP Editing Project Variables.

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
var gulp         = require('gulp'); // Gulp of-course

// CSS related plugins.
//var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
//var minifycss    = require('gulp-uglifycss'); // Minifies CSS files.
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
//var mmq          = require('gulp-merge-media-queries'); // Combine matching media queries into one media query definition.

// JS related plugins.
//var concat       = require('gulp-concat'); // Concatenates JS files
//var uglify       = require('gulp-uglify'); // Minifies JS files

// Image realted plugins.
//var imagemin     = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var lineec       = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
//var filter       = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.
var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify       = require('gulp-notify'); // Sends message notification to you
var browserSync  = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload       = browserSync.reload; // For manual browser reload.
//var wpPot        = require('gulp-wp-pot'); // For generating the .pot file.
//var sort         = require('gulp-sort'); // Recommended to prevent unnecessary changes in pot-file.


/*------------------------------my vars------------------------------*/

var less = require('gulp-less');
var lesssourcemap = require('gulp-less-sourcemap');
//var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var notifier = require('node-notifier');

//HILIGHT CONSOLE LOG
//SEE HOW TO https://github.com/chalk/chalk
var chalk = require('chalk');
var log = console.log;

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

var mylesssrc = projectFolder+'/assets/less/';
var mylessdest = projectFolder+'/assets/css/';

var mylessfilesEN = 'css.bs3.en.less';

var css_en = 'css.bs3.en.css';

var min_css_en = 'css.bs3.en.min.css';

//FOR WP
var less_wp_backend = [
	mylesssrc+'compress.less',
	mylesssrc+'shared.less',
];

//FOR EN	
var less_en = [
	mylesssrc+'css.bs3.en.less',
	mylesssrc+'compress.less',
	mylesssrc+'shared.less',
	mylesssrc+'theme.less',
	mylesssrc+'en.less',
	mylesssrc+'mediaqueries.less',
];


gulp.task( 'browser-sync', function() {
  browserSync.init( {

	proxy: projectURL,
	snippetOptions: {rule:{match: /$/ }},
	browser: 'chrome',
	logLevel: 'info', //debug
	logPrefix: project,
	open: true,
	injectChanges: true,
	files: [{
		match: projectPHPWatchFiles,
		fn: function (event, file) {
			this.reload()
		}
	}],

	notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                margin: '0px',
                padding: '5px',
                position: 'fixed',
                fontSize: '1em',
                zIndex: '9999',
                borderRadius: '5px 0px 0px',
                color: 'white',
                textAlign: 'center',
                display: 'block',
                backgroundColor: 'rgba(255, 0, 0, 0.8)'
            }
        }
	
  } );
  
    log(chalk.white.bgCyan.bold('Start browserSync...'));

});



/*-----------------------js concat combine+sourcemap---------------------------*/

var myjssrc = [
	//projectFolder+'/public/assets/js/resource/1.frontend.js',
	//projectFolder'/public/assets/js/resource/2.contact.buttons.js',
	projectFolder+'/public/assets/js/resource/5.jquery.fancybox.mousewheel.js',	
	projectFolder+'/public/assets/js/resource/6.jquery.fancybox.js',
	projectFolder+'/public/assets/js/resource/7.fancybox.setup.js',
	];

var myjsdest = projectFolder+'/public/assets/js/';
var jsoutput1 = 'all.js'; /*THIS FILE WILL HUGE SIZE BECUASE SOUCEMAP*/
var jsoutput2 = 'all.min.js';

gulp.task('javascript-combine', function() {//combine them
  return gulp.src(myjssrc)
    .pipe(sourcemaps.init())
    .pipe(concat(jsoutput1))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(myjsdest));
});

gulp.task('javascript-compress', function (cb) { //uglify+compress js
  var options = {
    //preserveComments: 'license',
  };
  pump([
        gulp.src(myjsdest+jsoutput1),
        uglify(options),
		rename({ suffix: '.min' }),
        gulp.dest(myjsdest)
    ],
    cb
  );
});




/*------------------------------my functions------------------------------*/

gulp.task('compile-lessEN', function() {  
  gulp.src(mylesssrc+mylessfilesEN)
	.pipe(less())
	//.pipe(cleanCSS({compatibility: 'ie9'}))
	.pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
	.pipe(rename(min_css_en))
	.pipe(gulp.dest(mylessdest));
	log(chalk.white.bgYellow.bold('LESS CSS processed'));
	//.pipe(browserSync.stream())
});

gulp.task('compile-lesssourcemapEN', function() {  
  gulp.src(mylesssrc+mylessfilesEN)
	.pipe(lesssourcemap({
		sourceMap: {
			sourceMapRootpath: '../less' //Optional absolute or relative path to your LESS files 
		}
    }))
	.on('error', function (error) {
		gutil.log(gutil.colors.yellow(error.message))
		// Notify on error. Uses node-notifier
		notifier.notify({
			title: 'Less error',
			time: 8000,
			message: error.message
		})
     })
	.pipe(gulp.dest(mylessdest))
});


 gulp.task('cssinjectEN', function() {
    log(chalk.white.bgYellow.bold('Inject CSS EN!'));
	gulp.src(mylessdest+css_en).pipe(browserSync.stream());
});

gulp.task('jsinject', function() {
	log(chalk.white.bgRed.bold('Inject JS!'));
	gulp.src(myjsdest+jsoutput2).pipe(browserSync.stream());
});

gulp.task( 'default', ['browser-sync'], function () {

	gulp.watch(less_en, ['compile-lessEN']);
	gulp.watch(less_en, ['compile-lesssourcemapEN']);
	gulp.watch(mylessdest+css_en, ['cssinjectEN']);
	
	//JS
	gulp.watch(myjssrc, ['javascript-combine']);
	gulp.watch(myjsdest+jsoutput1, ['javascript-compress']);
	gulp.watch(myjsdest+jsoutput2, ['jsinject']);
	
	
});
