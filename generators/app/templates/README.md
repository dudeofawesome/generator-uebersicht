# {{widgetName}}-widget
Übersicht {{widgetName}} widget

## Installation
Go to https://github.com/{{githubUsername}}/{{widgetName}}-widget/releases/latest, download `{{widgetName}}.widget.zip` from the Downloads section, and then unzip it into your Übersicht widget folder.

## Development
Run `npm install`, and then `gulp` to start a watch and compile the source files into the `build/final` folder

Then copy `build/final` into your Übersicht widget folder.

To produce a final, distributable build, run `gulp build`

There is a known issue where you may have to run `gulp build` up to 3 times for a complete build to be finished and zipped up.
