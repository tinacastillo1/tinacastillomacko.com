## About this project

This project is a static HTML site utilizing the Jekyll site generator and Gulp for automation. Read more about Jekyll (https://jekyllrb.com/) and Gulp (https://gulpjs.com/).


## Requirements
1. Ruby 2.0 or greater
2. OS X or UNIX compatible system
3. The latest version of [nodeJS](http://nodejs.org/)


## Installation
1. From the root directory, install Bundler: `$ gem install bundler`
2. Install dependencies next: `$ bundle install`
3. If Node + NPM is not already installed, download and and install Node + NPM from [https://nodejs.org/en/](https://nodejs.org/en/).
4. Install other dependencies by running 'npm install' from the root directory
5. Create initial /dist directory by running `gulp build`

*Note: if any dependencies throw an error when you run 'gulp build' try re-installing them in the root directory. For example, run 'npm install autoprefixer --save-dev'. (Replace autoprexfixer with the dependency name that is throwing the error).

 
## Usage

### Task Management / Build Process

Development takes place in /src, and when you run 'gulp' there is a task for jekyll to build the site in /dist. The css/scss and javascript for the site takes place in /src/_assets-src, and when you run 'gulp' there is a task that compiles, concatentates, and minizmize these files and places them in /src/assets (the jekyll task then copies /src/assets to /dist/assets, so you don't have to worry about moving any of these files).

The default [gulp](http://gulpjs.com/) task `gulp` will run the following tasks:

----

#### SCSS/CSS: `gulp styles`

- Compiles the SCSS partials in /src/_assets-src/scss/ 
         
- Adds vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer). (Default config is 'last 3 versions')    

- Places minified and non-minified CSS at /src/assets/css/

----

#### Javascript: `gulp scripts`

- Concatenates javascript found in /src/_assets-src/js/: plugins.js and main.js 

- Any vendor libraries or plugins can be placed in /src/_assets-src/js/vendor and then included in /src/_assets-src/js/plugins.js using the following syntax:
`//=require vendor/script-name.js`

- Custom javascript can be added to main.js

- Linting is provided via [JSHint](http://jshint.com/), using the [Stylish](https://github.com/sindresorhus/jshint-stylish) reporter

- Places minified script at /src/_assets-src/js/app.min.js

----

#### Gulp Watch: `gulp watch`

- Watches for changes to SCSS, JS, and issues the corresponding gulp task ('gulp styles' or 'gulp scripts').

----

#### HTML Templating: `gulp jekyll`

- Runs jekyll. Builds static HTML out of template parts found in /src and puts them in /dist

----

#### Browsersync: `gulp serve`

- Starts a [Browsersync](https://www.browsersync.io/) server for the site in /dist

- Watches for updates to HTML and assets in /src, and reloads the Browsersync session


## File Structure
- dist: built out html site
- src: working directory
	- _assets-src: working directory for css/scss and js
	- _includes: contains site includes
	- _layouts: contains different page layouts
	- _posts: contains different post types and posts
	- assets: built out assets folder that contains minified css, js, and images
	- favicons: contains favicons
	- *.html: pages in the site
- _config.yml: jekyll site settings
- gemfile.lock: manages gems
- gulpfile.js: manages gulp tasks


## Webfonts


## Styling

**Sass folders:**

- base: base styles for the site include animations, buttons, forms, lists, mixins, print, tables, and typography.
- components: styles based on the custom modules for the site.
- layout: header, general body, and footer styles.


##Javascript

### Vendor Scripts
Third-party plugins and scripts are placed in /src/_assets-src/js/vendor and added as an include in the plugins.js file.

- `jQuery`: [https://jquery.com/](https://jquery.com/)

### Custom Scripts

- `/_assets-src/js/main.js`

---


## Credits

**Author:** Tina Castillo Macko



