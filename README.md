# Boilerplate for react with ES6 and browserify

This is a boilerplate repo for using react with ES6 and browserify, and running it with gulp.

## Installation

```
npm install
```

After the installation, run `gulp` and browse to _http://localhost:8888_

The compiled code can be found in dist/bundle/app.js.

## What do you get

* A gulpfile with livereload
* Compilation of the jsx [1]
* Compilation of ES6 to ES5 [2], [3]

## Compilation step

This shows only the relevant steps. All the steps can be found in _gulpfile.js_. The main compilation step is shown below. Most of the inspiration comes from [7]. You should check this post, there is a great gulpfile included!

Because we also include react in the browserify steps, we use watchify to make the incremental builds fast.

```js
function compileScripts(watch) {
    gutil.log('Starting browserify');

    // The main script
    var entryFile = './app/jsx/app.jsx';

    // Set experimental to true to use features like let, const,...
    es6ify.traceurOverrides = {experimental: true};

    var bundler;
    // Use watchify for fast updates, otherwise use browserify
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    // Include react
    bundler.require(requireFiles);

    // Compile the jsx files
    bundler.transform(reactify);

    // Compile ES6 features. Make sure to set configure is you use .jsx files
    bundler.transform(es6ify.configure(/.jsx/));

    var rebundle = function () {
        // Debug: true: creates sourcemaps
        var stream = bundler.bundle({ debug: true});

        stream.on('error', function (err) { console.error(err) });
        // Source uses vinyl-source-stream. This lets us use the browserify api directly instead of using the gulp-browserify plugin [4].
        stream = stream.pipe(source(entryFile));

        // rename the resulting file to app.js and save it to dist/bundle
        stream.pipe(rename('app.js'));
        stream.pipe(gulp.dest('dist/bundle'));
    }
    
    // When watchify see an update, run rebundle.
    bundler.on('update', rebundle);
    return rebundle();
}

```

## React with ES6

### ES6 classes

```js
import React from 'react'; // import react

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

```js
import {MainSection} from './components/MainSection.react.jsx';
```

### String templating for classes

```js
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
* [7] Fast build with browserify and reactjs - http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
