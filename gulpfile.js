var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;
var browserSync = require('browser-sync').create();

gulp.task('server', function() {
    if (node) node.kill()
    node = spawn('node', ['server.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

gulp.task('default', function() {
        browserSync.init({proxy: "localhost:8000" })
        gulp.run('server')
        gulp.watch('server.js', function() {
            gulp.run('server')
        })
        gulp.watch("./*.html", ["reload"])
        gulp.watch("./*.css", ["reload"])
        gulp.watch("./views/*.ejs", ["reload"])
        gulp.watch("gulpfile.js", ["default"])
})

gulp.task("reload", function() {
    browserSync.reload()
    console.log("Browser reloaded")
})

process.on('exit', function() {
    if (node) node.kill()
})
