"use strict";

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const webpack = require("webpack-stream");
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


const dist = "./dist/";

gulp.task("copy-html", () => {
    return gulp.src("src/*.html")
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src("src/img/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest(dist + "/assets/img"))
      .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest(dist+"/assets/fonts"))
        .pipe(browserSync.stream());
});
gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest(dist+"/assets/icons"))
        .pipe(browserSync.stream());
});

gulp.task('styles',function(){
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
          cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
                prefix: "",
                suffix: ".min",
                })) 
        .pipe(gulp.dest(dist+"/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + "/js"))
                .on("end", browserSync.reload);
});

gulp.task('watch', function(){
    browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });

    gulp.watch("src/index.html", gulp.parallel("copy-html"));
    gulp.watch("src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task("build",gulp.series("styles", "build-js", "copy-html", 'fonts', 'icons', 'images') );


gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task('default', gulp.parallel('watch','build'));