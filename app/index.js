'use strict';
var yeoman = require('yeoman-generator');
var util = require('../util');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
		this.sourceRoot(path.join(__dirname, '../templates/common'));
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
    }, {
			type: 'confirm',
			name: 'jade',
			message: 'Would you like to use Jade?',
			default: false
		}];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
			this.projectname = this._.camelize(this._.slugify(this._.humanize(this.projectName)));
			
			this.jade = props.jade;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
			this.template('_bower.json', 'bower.json');
			this.template('_package.json', 'package.json');
			this.template('_README.md', 'README.md');
			this.template('_Gruntfile.js', 'Gruntfile.js');
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
        this.templatePath('src/robots.txt'),
        this.destinationPath('src/robots.txt')
      );
			this.directory('src/js');
			this.directory('src/scss');
			this.directory('src/images');
    },

		jade: function() {
			if(this.jade) {
				this.sourceRoot(path.join(__dirname, '../templates/jade'));
				this.fs.copy(
					this.templatePath('src/index.jade'),
					this.destinationPath('src/index.jade')
				);
				this.directory('src/layout');
				this.directory('src/partials');
			} else {
				this.fs.copy(
					this.templatePath('src/index.html'),
					this.destinationPath('src/index.html')
				);
			}
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
