const gulp = require("gulp")

//处理.html
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//处理.js代码 
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//处理img
gulp.task("images",function(){
    return gulp.src("img/**/*.{png,jpg,webp}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})


const sass = require("gulp-sass")
//处理scss代码
gulp.task("sass",function(){
    gulp.src("stylesheet/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})


//数据源
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build",["copy-html","scripts","images","sass","data"],function(){
    console.log("项目建立成功")
})

// 监听
gulp.task("watch",function(){
    gulp.watch("*.html",["copy-html"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("img/**/*.{png,jpg,webp}",["images"]);
    gulp.watch("stylesheet/*.scss",["sass"]);
    gulp.watch(["*.json","!package.json"],["data"]);
})

const connect =require("gulp-connect")

gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

//设置默认任务
gulp.task("default",["watch","server"])