/* Dependencies */
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");
const rename = require("gulp-rename");
const lineec = require("gulp-line-ending-corrector");
const clean = require("gulp-clean");

/* Directories */
const clientsource = "assets/client/";
const exportsource = "assets/export/";
const serversource = "assets/server/";

/* Tasks */
const directories = () => {
    return gulp.src("*.*", {read: false})
    .pipe(gulp.dest(exportsource))
    .pipe(gulp.dest(exportsource + "public"))
}

const copyViews = () => {
    return gulp.src(clientsource + "*.html")
    .pipe(lineec())
    .pipe(gulp.dest(exportsource));
}

const sassCompile = () => {
    return gulp.src(clientsource + "scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(clientsource + "css/"));
}

const concatCSS = () => {
    return gulp.src(clientsource + "css/*.css")
    .pipe(concat("styles.min.css"))
    .pipe(cleanCSS())
    .pipe(lineec())
    .pipe(gulp.dest(exportsource + "public/"));
}

const typescript = () => {
    const tsProject = ts.createProject("tsconfig.json");
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(lineec())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(gulp.dest(exportsource));
}

const cleanup = () => {
    return gulp.src(clientsource + "css", {read: false})
    .pipe(clean());
}

const refactor = gulp.series(directories, copyViews, sassCompile, concatCSS, typescript, cleanup);
gulp.task("default", refactor);
