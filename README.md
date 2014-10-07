# README #

Single page app that allows users to calculate project risk at: https://ocio.wa.gov/risk-severity-calculator

## Install ##
```
npm install
```

## Build ##
```
./node_modules/.bin/grunt
```
The build process uses `grunt-html-build` to strip the HTML headers and footers out, minify and inline all of the Javascript and CSS and put it in a single `dist/app.html` file whose contents can be cut and pasted wholesale into the edit raw html source Drupal window.  Automating updating the Drupal content item is an exercise left to the reader.