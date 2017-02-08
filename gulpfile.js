var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var cssminify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

//server load
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//react
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var webpackConfig = require("./webpack.config.js");

//config
var config = {
	app: "app",
	temp: "tmp",
	dest: "dest",
	jsfolder: "/Scripts/netw.react"
};

//react task
gulp.task('react-build', function(){
	return gulp.src([config.app + '/jsx/*.jsx', config.app + '/jsx/libraries/*.jsx'])
				.pipe(named())
				.pipe(plumber())
				.pipe(webpack(webpackConfig))
    			.pipe(gulp.dest(config.temp + config.jsfolder));
});

//server task
//server task
gulp.task('browserSync', ['clean'], function() {
    browserSync.init({
        server: {
            baseDir: "./tmp"
        }
    });

	return gulp.watch([
				config.app + '/{*,*/,*/*/}*.html',
				config.app + '/js/*.js',
				config.app + '/jsx/{*, */*, */*/*}.jsx',
				config.app + '/scss/{*,*/,*/*/,*/*/*/}*.scss'
			], ['react-build', 'sass', 'copy']).on("change", reload);
});


gulp.task('sass', function(){
	return gulp.src(config.app + '/scss/{*,*/,*/*/,*/*/*/}*.scss')
			   .pipe(sass({
	                    includePaths: [
							'./node_modules/font-awesome',
							'./node_modules/compass-mixins/lib',
							'./node_modules/susy/sass',
							'./node_modules/animatewithsass/'
						],
						outputStyle: 'expanded',
						precision: 10,
						errLogToConsole: true
	                }).on('error', sass.logError)
				)
			   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			   .pipe(gulp.dest(config.temp + '/css'));
});

//copy task
gulp.task('copy', function(){
	return gulp.src([
					config.app + '/*.html',
					config.app + '/js/*.js',
					config.app + '/fonts/*.*',
					config.app + '/images/{*,*/}*.*',
					config.app + '/Themes/2016/images/{*,*/}*.*'
				], { base: config.app })
			   .pipe(gulp.dest(config.temp));
});


//dist tasks
gulp.task('dist:css', function(){
	return gulp.src(config.temp + '/css/*.css')
			   .pipe(cssminify())
			   .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('dist:copy', function(){
	return gulp.src([
					config.app + '/*.html',
					config.app + '/js/*.js',
					config.app + '/fonts/*.*',
					config.app + '/images/{*,*/}*.*'
				], { base: config.app })
			   .pipe(gulp.dest(config.dest));
});

gulp.task('dist:uglify', function(){
	return gulp.src([
		config.temp + config.jsfolder + '/*.js'
	], { base: config.temp })
	.pipe(uglify())
	.pipe(gulp.dest(config.dest));
});

//clean task
gulp.task('clean', function(cb){
    return del(['tmp', 'dest'], {force: true, read: false}, cb);
});

gulp.task('server', ['browserSync'], function(){
	gulp.start(['react-build', 'sass', 'copy']);
});

gulp.task('build', ['dist:copy', 'dist:uglify', 'dist:css']);
