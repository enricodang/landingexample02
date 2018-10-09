var gulp =			require('gulp');
var uglify =		require('gulp-uglify');
var sass =			require('gulp-sass');
var minifyCSS = 	require('gulp-csso');
var rename =		require('gulp-rename');
var concat =		require('gulp-concat');
var autoprefixer =	require('gulp-autoprefixer');
var sourcemaps =	require('gulp-sourcemaps');
var ftp =			require('vinyl-ftp');
var gutil =         require('gutil');
var using =			require('gulp-using');
var config =		require('./config');
var glob =			require("glob");
var bs =            require('browser-sync');
var livereload =    require('gulp-livereload');
var reload =        bs.reload;
    var conn = ftp.create( {
        host:     config.ftp.host,
        user:     config.ftp.user,
        password: config.ftp.psw,
        parallel: 8,
        log:      gutil.log
    } );

gulp.task('scripts-vendor', function() {
	return gulp.src(config.src.scripts.vendor)
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(concat('tempv.js'))
    .pipe(rename('vendor.min.js'))
	.pipe(gulp.dest('../dist'))
    //.pipe(conn.dest( config.ftp.root ))
    //.pipe(bs.stream());
});

gulp.task('scripts-app', function() {
    return gulp.src(config.src.scripts.app)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(concat('tempa.js'))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('../dist'))
    //.pipe(conn.dest( config.ftp.root ))
    //.pipe(bs.stream());
});

gulp.task('sass', function(){
  return gulp.src(config.src.sass)
    .pipe(using({}))
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.autoprefixerOptions.browsers))
    .pipe(concat('temp.scss'))
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('../dist'))
    //.pipe(conn.dest( config.ftp.root ))
    //.pipe(bs.stream());
});

gulp.task('php', function() {
    return gulp.src(config.src.php)
        .pipe(bs.stream());
});

gulp.task('deploy', function () {
    return gulp.src( config.globs, { base: '.',buffer: false } )
        .pipe( conn.newer( config.ftp.root ) ) // only upload newer files
        .pipe( conn.dest( config.ftp.root ) );
});

gulp.task('browser-sync', function() {
    bs.init({
        proxy: config.production.domain,
        open: false
    });
});

gulp.task('copy-fonts', function() {
  gulp.src(config.src.fonts)
      .pipe(gulp.dest('../dist/fonts'))
      .pipe(conn.dest(config.ftp.root+'fonts/'))
      //.pipe(bs.stream());
  return true;
});

gulp.task('default', [ 'sass','scripts-vendor','scripts-app' ]);

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch(config.src.sasswatch, ['sass']);
    gulp.watch(config.src.php, ['php']);
    gulp.watch(config.src.scripts.app, ['scripts-app']);
});