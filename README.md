# HTML Email Template-making and Taskrunner

## Dependencies
Clone down this repository into your preferred directory.

    git clone https://github.com/mcasey5216/email-taskrunner.git

If you do not have grunt installed globally, in your terminal, from any directory, run these two commands:

    sudo npm install -g grunt-cli
    sudo gem install sass

In the main directory of this repository (where the `Gruntfile.js` is), install the dependencies.

    sudo npm install

You can run the command `grunt --help` for more options or information.

## How to Use

In the termainal from the main directory, run `grunt watch` to make and view any changes in a browser.  Grunt watch currently reacts to changes in any of the files in the `sass/` or `jade/` directories. If you run the command `grunt` in the terminal, it will compile the `Sass` and `Jade` into one html file of the same name in the `dist/jade/` directory.

## Bugs
Pug will not interpolate variables in the attributes of tags when converting `Jade` into `HTML`

## Concerns
- Is this overly complicated still, is there an even simpler way to run these tasks?
- Is this beneficial to "one time" emails, or better for long lasting reoccurring campaigns?
