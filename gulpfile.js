

var gulp = require('gulp'),
    scss = require('gulp-sass'),	
    browserSync = require('browser-sync'),		
    sourcemaps = require('gulp-sourcemaps'),	 
    autoprefixer = require('gulp-autoprefixer'), 
    notify = require('gulp-notify');
    gulpWait = require('gulp-wait');  


// Styles
gulp.task('scss', function () {
    return gulp.src('./app/styles/scss/main.scss')	  // download
        .pipe(sourcemaps.init()) 					  // create file.sourceMap
        .pipe(gulpWait(500))
        .pipe(scss())
        .on('error', notify.onError(function (err) {  // dont stop after error
            return {								  // show error
                title: "SCSS ERROR",
                message: err.message
            }
        }))
        .pipe(autoprefixer([						  // add prefix
            'last 15 versions',
            '> 1%',
            'ie 9',
            'ie 8'
        ], { cascade: true }						  // cascade style optimization
        ))

        .pipe(sourcemaps.write('.'))				   // add sourcemap
        .pipe(gulp.dest('./app/styles/css/'))		   // css upload		
        .pipe(browserSync.reload({ stream: true }));   // accept styles without page reloading
});


// Browser-sync
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'app'  // Project way
        },
        // proxy: {
        //     target: "http://poskot.new.test/", 
        //     ws: true
        // },
        notify: false   	// Server notify show
    })
});

// Watch
gulp.task('watch', ['server', 'scss'], function () {        // ['server', 'scss', 'scripts'] - to do
    gulp.watch('./app/styles/**/*.scss', ['scss']);       // watch at .scss
    gulp.watch('./app/**/*.html', browserSync.reload);    // watch at .html
    gulp.watch('./app/js/**/*.js', browserSync.reload);   // watch at .js
});


