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
    this._TMPLATE_DIR = this.props.module_name;
    this._writingGulpfile();
    this._writingIndexHtml();
    this._writingReadme();
    this._writingImages();
    this._writingSass();
    this._writingScrips();
  },
  _writingGulpfile: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/gulpfile.js'),
      this.destinationPath(this._TMPLATE_DIR + '/gulpfile.js'),
      this.props
    );
  },
  _writingIndexHtml: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/index.html'),
      this.destinationPath(this._TMPLATE_DIR + '/index.html'),
      this.props
    );
  },
  _writingReadme: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/README.MD'),
      this.destinationPath(this._TMPLATE_DIR + '/README.MD'),
      this.props
    );
  },
  _writingImages: function () {
    this.fs.copy(
      this.templatePath('module-template/src/images/*'),
      this.destinationPath(this._TMPLATE_DIR + '/src/images/')
    );
  },
  _writingSass: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/src/sass/template.scss'),
      this.destinationPath(this._TMPLATE_DIR + '/src/sass/' + this._TMPLATE_DIR + '.scss'),
      this.props
    );
  },
  _writingScrips: function () {
    this.fs.copyTpl(
      this.templatePath('module-template/src/scripts/template.js'),
      this.destinationPath(this._TMPLATE_DIR + '/src/scripts/' + this._TMPLATE_DIR + '.js'),
      this.props
    );
  },
  install: function () {
    this.log('cd ' + this._TMPLATE_DIR);
    this.log('npm install');
    //this.installDependencies();
  }
});
