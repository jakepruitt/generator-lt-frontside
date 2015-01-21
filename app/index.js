'use strict';
var yeoman = require('yeoman-generator');
var util = require('../util');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(util.greeting);

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What would you like to name your project?',
      default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
			this.template('_bower.json', 'bower.json');
			this.template('_package.json', 'package.json');
			this.template('_README.md', 'README.md');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
			this.directory('src');
    }
  },

  install: function () {
    this.installDependencies({
			npm: true,
			bower: false,
			skipInstall: this.options['skip-install']
    });
  }
});
