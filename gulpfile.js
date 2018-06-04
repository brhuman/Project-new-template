

var gulp = require('gulp'),
    scss = require('gulp-sass'),	
    browserSync = require('browser-sync'),		
    sourcemaps = require('gulp-sourcemaps'),	 
    autoprefixer = require('gulp-autoprefixer'), 
    notify = require('gulp-notify');


// Styles
gulp.task('scss', function () {
    return gulp.src('./app/styles/scss/main.scss')		 // путь загрузки
        .pipe(sourcemaps.init()) 					 // создание file.sourceMap
        .pipe(scss())
        .on('error', notify.onError(function (err) {  // не выкидывать при ошибке
            return {								 // + выводить ее
                title: "SCSS ERROR",
                message: err.message
            }
        }))
        .pipe(autoprefixer([						 // добавление префиксера
            'last 15 versions',
            '> 1%',
            'ie 9',
            'ie 8'
        ], { cascade: true }						 // оптимизация читабельности
        ))

        .pipe(sourcemaps.write('.'))				 // добавление соурсмап
        .pipe(gulp.dest('./app/styles/css/'))				 // путь выгрузки			
        .pipe(browserSync.reload({ stream: true }));   // применить стили без перезагрузки страницы
});


// Browser-sync
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'app'  // путь проекта
        },
        // proxy: {
        //     target: "http://poskot.new.test/", 
        //     ws: true
        // },
        notify: false   	// отключаем уведомления сервера
    })
});

// Watch
gulp.task('watch', ['server', 'scss'], function () {        // ['server', 'scss', 'scripts'] - выполнить до function
    gulp.watch('./app/styles/**/*.scss', ['scss']);         // слежка за .scss
    gulp.watch('./app/**/*.html', browserSync.reload);    // слежка за .html
    gulp.watch('./app/js/**/*.js', browserSync.reload);   // слежка за .js
});


