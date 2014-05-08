# Boilerplate for react with ES6 and browserify

This is a boilerplate repo for using react with ES6 and browserify, and running it with gulp.

## Installation


```
npm install
bower install
```

After the installation, run `gulp` and browse to _http://localhost:8888_

The compiled code can be found in dist/bundle/app.js.

## What do you get

* A gulpfile with livereload
* Compilation of the jsx [1]
* Compilation of ES6 to ES5 [2], [3]

## Compilation step

This shows only the relevant steps. All the steps can be found in _gulpfile.js_.

```
var rename = require('gulp-rename');
var browserify = require('browserify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
```

_vinyl-source-stream_ lets us use the browserify api directly instead of using the gulp-browserify plugin [4].

```
var entryFile = './app/jsx/app.jsx'
```

This is the main script that needs to be compiled

```
gulp.task('browserify', function () {
    return browserify({
            entries: [entryFile]
        }).
        require('./node_modules/react/react.js').
        transform(reactify).
        transform(es6ify.configure(/.jsx/)).
        bundle({ debug: true}).
        on('error', function (err) { console.error(err); }).
        pipe(source(entryFile)).
        pipe(rename('app.js')).
        pipe(gulp.dest('dist/bundle'));
});

```

The browserify task does following things:

* It compiles the entryFile (and all imported files) + requires the react file,
* first through reactify (jsx compilation step)
* then through es6ify (ES6 -> ES5). We configure es6ify to compile the jsx files.
* Debug: true: creates sourcemaps
* If there is an error, report it to the console
* source: input the entryfile to browserify
* rename the resulting file to app.js and save it to dist/bundle


```
es6ify.traceurOverrides = {experimental: true};
```

This lets us use experimental functions of traceur (like let and const).

## React with ES6

### ES6 classes

```
class _MainSection {
    render() {
        return (
            <div>
                <h1>Example of React with es6 and browserify</h1>
                <Body />
            </div>
        );
    }
}
export const MainSection = React.createClass(_MainSection.prototype);
```

We can create ES6 classes, but have to export it with `React.createClass` [5]. Importing the created files can be done like this:

```
import {MainSection} from './components/MainSection.react.jsx';
```

### String templating for classes

```
class _Body {
    getClassName() {
        return 'foo';
    }


    render() {
        const x = 'x';

        return (
            <div className={`${x} ${this.getClassName()} bar`}>
                Hello there!
            </div>
        );
    }
}
```

As you can see, you can use template literals [6] to create your classnames.


## Sources

* [0] Browserify - https://github.com/substack/node-browserify
* [1] Reactify - https://github.com/andreypopp/reactify
* [2] es6ify - https://github.com/thlorenz/es6ify
* [3] traceur-compiler - https://github.com/google/traceur-compiler
* [4] vinyl-source-stream - https://www.npmjs.org/package/vinyl-source-stream
* [5] react-es6-class - https://github.com/bjoerge/react-es6-class
* [6] Template Literals - https://github.com/google/traceur-compiler/wiki/LanguageFeatures#template-literals