/* Dependencies */
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");
const rename = require("gulp-rename");

/* Directories */
const clientsource = "assets/client/";
const exportsource = "assets/export/";
const serversource = "assets/server/";

/* Tasks */
const copyViews = () => {
    return gulp.src(clientsource + "*.html")
    .pipe(gulp.dest(exportsource));
}

const typescript = () => {
    const tsProject = ts.createProject("tsconfig.json");
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(gulp.dest(exportsource));
}

const refactor = gulp.parallel(typescript, copyViews);
gulp.task("default", refactor);
