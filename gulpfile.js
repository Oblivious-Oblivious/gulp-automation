const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const typescript = () => {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("assets/export"));
}

gulp.task("default", typescript);
