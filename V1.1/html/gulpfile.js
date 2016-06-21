var gulp = require('gulp');
var uglify=require("gulp-uglify");
var cssmin = require('gulp-minify-css');
var cssver = require('gulp-make-css-url-version'); 
var less=require("gulp-less");
 var clean= require('gulp-clean');
/**
 * js压缩脚本
 */
gulp.task('mjs', function() {
    gulp.src("js/*.js")
    .pipe(uglify()).pipe(gulp.dest("js/min/"));
})

/**
 * css压缩
 */
gulp.task('mcss', function () {
    gulp.src('css/*.css')
    .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
    .pipe(cssmin())
    .pipe(gulp.dest('css/min/'));
});
// less 编译
gulp.task('bless',function() {
     gulp.src('less/*.less')
     .pipe(less())
     .pipe(gulp.dest('css/'));
})

//多余文件删除
gulp.task('clean', function () {
     gulp.src(['css/min/*.css','js/min/*.js'])
    .pipe(clean());
});

// 各种操作
gulp.task('go',['clean','bless','mcss','mjs'],function(params) {
    console.log("完成");
});