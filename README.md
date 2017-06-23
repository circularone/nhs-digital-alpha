# NHS Digital Alpha Protoype

Prototype as part of a service design proposal for NHS England by [Nile](https://nilehq.com).

This is purely for demonstration of ideas only and not to be used in production.

[Live demo](https://nhs.spideronline.co.uk/)

## Requirements

Requires npm package manager. The best way to install npm is to install node using the node.js installer. npm is installed as part of node.

Get the node installer and help at [nodejs.org](https://nodejs.org).

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm install
```

Now browse to the app at [localhost:8000](http://localhost:8000).

### Editing the Application

The project uses gulp to build the javascript, css and html from the "source" directory. To automatically build the files as you edit run:

```
gulp watch
```

Every time you save a file in the source directory gulp will rebuild the relevant files and reload the browser.

The application is built using [AngularJs](https://angularjs.org/) and follows the [Angular Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
