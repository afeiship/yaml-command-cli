'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the splendid ' + chalk.red('generator-native-offline-h-5') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'module_name',
      message: 'Your module name?'
    }, {
      type: 'input',
      name: 'description',
      message: 'Your module descriptioin?'
    }, {
      type: 'input',
      name: 'wiki_url',
      message: 'Your module related wiki?'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    this._writingGulpfile();
    this._writingIndexHtml();
    this._writingPackageJson();
    this._writingReadme();
    this._writingImages();
    this._writingSass();
    this._writingScrips();
  },
  _writingGulpfile: function () {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.props
    );
  },
  _writingIndexHtml: function () {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this.props
    );
  },
  _writingPackageJson: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  },
  _writingReadme: function () {
    this.fs.copyTpl(
      this.templatePath('README.MD'),
      this.destinationPath('README.MD'),
      this.props
    );
  },
  _writingImages: function () {
    this.fs.copy(
      this.templatePath('src/images/*'),
      this.destinationPath('src/images/')
    );
  },
  _writingSass: function () {
    this.fs.copy(
      this.templatePath('src/sass/template.scss'),
      this.destinationPath('src/sass/' + this.props.module_name + '.scss')
    );
  },
  _writingScrips: function () {
    this.fs.copyTpl(
      this.templatePath('src/scripts/template.js'),
      this.destinationPath('src/scripts/' + this.props.module_name + '.js'),
      this.props
    );
  },
  install: function () {
    this.installDependencies();
  }
});
