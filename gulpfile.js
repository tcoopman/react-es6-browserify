'use strict';

var gulp = require('gulp');

var livereload = require('gulp-livereload');
var connect = require('connect');

var rename = require('gulp-rename');
var browserify = require('browserify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


/** Config variables */
var serverPort = 8888;
var lrPort = 35731;


/** File paths */
var dist = 'dist';

var htmlFiles = 'app/**/*.html';
var htmlBuild = dist;

var jsxFiles = 'app/jsx/**/*.jsx';

var vendorFiles = [
    'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'];
var vendorBuild = dist + '/vendor';
var requireFiles = './node_modules/react/react.js';


gulp.task('vendor', function () {
    return gulp.src(vendorFiles).
        pipe(gulp.dest(vendorBuild));
});


gulp.task('html', function () {
    return gulp.src(htmlFiles).
        pipe(gulp.dest(htmlBuild));
});


var entryFile = './app/jsx/app.jsx';
es6ify.traceurOverrides = {experimental: true};

gulp.task('browserify', function () {
    return browserify({
            entries: [entryFile]
        }).
        require(requireFiles).
        transform(reactify).
        transform(es6ify.configure(/.jsx/)).
        bundle({ debug: true}).
        on('error', function (err) { console.error(err); }).
        pipe(source(entryFile)).
        pipe(rename('app.js')).
        pipe(gulp.dest('dist/bundle'));
});


gulp.task('server', function (next) {
    var server = connect();
    server.use(connect.static(dist)).listen(serverPort, next);
});


function initWatch(files, task) {
    if (typeof task === "string") {
        gulp.start(task);
        gulp.watch(files, [task]);
    } else {
        task.map(function (t) { gulp.start(t) });
        gulp.watch(files, task);
    }
}



/**
 * Run default task
 */
gulp.task('default', ['vendor', 'server'], function () {
    var lrServer = livereload(lrPort);
    var reloadPage = function (evt) {
        lrServer.changed(evt.path);
    };

    function initWatch(files, task) {
        gulp.start(task);
        gulp.watch(files, [task]);
    }

    initWatch(jsxFiles, 'browserify');
    initWatch(htmlFiles, 'html');

    gulp.watch([dist + '/**/*'], reloadPage);
});
