# <%= projectName %>: Built with generator-lt-frontside

Here at LaneTerralever, we've worked on a lot of projects. We've used Bootstrap, LESS, Sass, Angular, Ember, Foundation, Middleman, Grunt, Gulp, Bower, Bundler, npm, CoffeeScript, Jade, Haml, and dozens of other front-end tools. Every project had its own setup, with its own commands and compilation steps. There were no standards, and every project felt like it needed to retread the same water.

With this toolkit, we hope to remove headache of setting up a new project. This toolkit makes it easy to get started quickly on a project and not fuss with any configuration.

## Why Grunt/Bower?

We hope to stay up to date with the rotating gambit of new technology, and make it easy to utilize cutting edge technology while still conforming to standards. To do this, we are relying on Bower as a dependency manager to keep our dependencies up to date and handle new versions of technology with one command. We also want to use new tools that come in to the front-end world, like pre-compiled languages, code conformance checkers, and performance enhancing tools. Grunt allows us to easily encorporate these actions into the easy workflow of testing, building, and working in development.

## Installation

In order to get all of the tools you need, both for Grunt commands and Bower dependencies, run the single command

```bash
npm install
```

## Getting Started

Change directories into your new project and start the preview server:

```
cd MY_PROJECT
npm start
```

The preview server allows you to build your site, by modifying the contents of the `src` directory, and see your changes reflected in the browser at: `http://localhost:4000/`

Finally, you will want to build your project into a stand-alone site. From the project directory:

```
npm run build
```

This will compile your templates and output a stand-alone site which can be easily hosted or delivered to your client. The build step can also compress images, employ Javascript & CSS dependency management, minify Javascript & CSS and run additional code of your choice. Take a look at the `Gruntfile.js` file to see some of the most common extensions which can be activated.

You can also generate a report of common performance analytics with the test command:

```
npm test
```

## Learn More

A full set of in-depth instructional guides are available on the official [generator-lt-frontside](https://github.com/jrpruit1/generator-lt-frontside) repository.

