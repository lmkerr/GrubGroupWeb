var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
	runSequence = require('run-sequence');


gulp.task('js', function() {
	var jsFiles = gulp.src('./src/app/**/*.js')
		.pipe(angularFilesort())
		.pipe(ngAnnotate({
			add: true,
			single_quotes: true
		}));

	return gulp.src('./build/index.html')
		.pipe(inject(
			jsFiles
		))
		.pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
	var cssFiles = gulp.src('./src/content/styles/app.less')
		.pipe(less())
		.pipe(gulp.dest('./build'));


	return gulp.src('./build/index.html')
		.pipe(inject(
			cssFiles
		))
		.pipe(gulp.dest('./build'));
});

gulp.task('bowerfiles', function() {
	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(bowerFiles(), { read: false }), { name: 'bower', base: 'src/vendor' }))
		.pipe(gulp.dest('./build'));
});

gulp.task('build',['templates'], function(){
	runSequence('bowerfiles','styles','js');
});

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './',
            index: 'build/index.html'
        },
        browser: ['google chrome'],
        ghostMode: false
    });
});


gulp.task('templates', function() {
    return gulp.src('./src/app/**/*.html')
        .pipe(minifyHTML({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('./build'));
});


gulp.task('bs-reload', function(){
    browserSync.reload();
});


gulp.task('default',['build','serve'], function(){
    gulp.watch('src/**/*.js', ['js', 'bs-reload']);
    gulp.watch('src/**/*.html', ['templates', 'bs-reload']);
    gulp.watch(['src/content/styles/**/*.less', '!src/content/styles/vendor/**/*.less'], ['styles', 'bs-reload']);
});
