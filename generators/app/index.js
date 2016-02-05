'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('Übersicht widget') + ' generator!'
        ));

        var prompts = [
            {
                type: 'input',
                name: 'widgetName',
                message: 'Your widget name (no special characters)',
                default: this.appname,
                validate: function (input) {
                    var valid = input.match(new RegExp('^[A-Za-z][A-Za-z0-9-]*$')) !== null;
                    return (valid) ? true : 'Must begin with a letter, and contain only alpha-numeric or dashes';
                }
            },
            {
                type: 'input',
                name: 'widgetDescription',
                message: 'Describe your widget'
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Your name',
                default: this.user.git.name()
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Your email',
                default: this.user.git.email()
            },
            {
                type: 'input',
                name: 'githubUsername',
                message: 'Your Github username',
                default: this.user.github.username(),
                store: true
            },
            {
                type: 'input',
                name: 'license',
                message: 'License',
                default: 'GPL-2.0'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: function () {
        var dotFiles = ['bowerrc', 'gitignore', 'jscsrc', 'jshintignore', 'scss-lint.yml'];
        for (var i in dotFiles) {
            this.fs.copy(
                this.templatePath('.' + dotFiles[i]),
                this.destinationPath('.' + dotFiles[i])
            );
        }

        var responseFiles = [
            {
                path: 'gulpfile.js',
                responses: ['widgetName']
            },
            {
                path: 'layout.html',
                responses: ['widgetName']
            },
            {
                path: 'package.json',
                responses: ['widgetName', 'widgetDescription', 'authorName', 'authorEmail', 'license', 'githubUsername']
            },
            {
                path: 'README.md',
                responses: ['widgetName', 'githubUsername']
            },
            {
                path: 'script.js',
                responses: ['widgetName']
            },
            {
                path: 'style.scss',
                responses: ['widgetName']
            }
        ];
        for (i in responseFiles) {
            for (var j in responseFiles[i].responses) {
                var file = responseFiles[i].file ? responseFiles[i].file : this.fs.read(this.templatePath(responseFiles[i].path));
                file = file.split('{{' + responseFiles[i].responses[j] + '}}').join(this.props[responseFiles[i].responses[j]]);
                if (j < responseFiles[i].responses.length - 1) {
                    responseFiles[i].file = file;
                } else {
                    this.fs.write(this.destinationPath(responseFiles[i].path), file);
                }
            }
        }
        this.fs.copy(
            this.templatePath('./modules'),
            this.destinationPath('./modules')
        );
        this.fs.copy(
            this.templatePath('./resources'),
            this.destinationPath('./resources')
        );
    },

    install: function () {
        this.installDependencies();
    }
});
