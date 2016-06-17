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
      this.templatePath('module-template/gulpfile.js'),
      this.destinationPath('module-template/gulpfile.js'),
      this.props
    );
  },
  _writingIndexHtml: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/index.html'),
      this.destinationPath('module-template/index.html'),
      this.props
    );
  },
  _writingPackageJson: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/package.json'),
      this.destinationPath('module-template/package.json'),
      this.props
    );
  },
  _writingReadme: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/README.MD'),
      this.destinationPath('module-template/README.MD'),
      this.props
    );
  },
  _writingImages: function () {
    this.fs.copy(
      this.templatePath('module-template/src/images/*'),
      this.destinationPath('module-template/src/images/')
    );
  },
  _writingSass: function () {
    this.fs.copy(
      this.templatePath('module-template/src/sass/template.scss'),
      this.destinationPath('module-template/src/sass/' + this.props.module_name + '.scss')
    );
  },
  _writingScrips: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/src/scripts/template.js'),
      this.destinationPath('module-template/src/scripts/' + this.props.module_name + '.js'),
      this.props
    );
  },
  install: function () {
    this.installDependencies();
  }
});
