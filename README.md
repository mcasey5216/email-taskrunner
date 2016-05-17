# HTML Email Template-making and Taskrunner

## Dependencies
Clone down this repository into your preferred directory.

    git clone https://github.com/mcasey5216/email-taskrunner.git

[Install node.js](https://nodejs.org/en/download/)

If you do not have grunt installed globally, in your terminal, from any directory, run these two commands:

    sudo npm install npm -g
    sudo npm install -g grunt-cli
    sudo gem install sass

In the main directory of this repository (where the `Gruntfile.js` is), install the dependencies.

    sudo npm install

You can run the command `grunt --help` for more options or information.

Emails are written in `pug` format.  See more [here](http://jade-lang.com/reference/) or [here](https://github.com/pugjs/pug).  Note that `pug` was formally known as `Jade`.  If using Atom text editor, be sure to install the `language-pug` [package](https://atom.io/packages/language-pug) for readability.

## How to Use

In the terminal from the main directory, run `grunt watch` to make and view any changes in a browser.  Grunt watch currently reacts to changes in any of the files in the `sass/` or `pug/` directories. If you run the command `grunt` in the terminal, it will compile the `Sass` and `pug` into one html file of the same name in the `dist/pug/` directory.

### Creating a New Template

1. Start but duplicating the `pug/index.pug` file and rename it the name of the campaign. e.g. `pug/{campaign_name}.pug`.
2. Make the associated sass file in `sass/_{campaign_name}.scss`.  Don't forget the underscore at the beginning of the file name
3. In the `sass/style.scss` file add `@import '{campaign_name}';` to the top. Do not include the underscore or the `.scss` in this path name. Comment out the imports that are not in use.
4. In the `sass/_{campaign_name}.scss` file, nest all of the contents into a larger class.  e.g.
        .aycl {
          .inner {
            padding: 30px;
          }
        }
This will override general template formatting where necessary.
5. In the `pug/{campaign_name}.pug`, add the class the `center.wrapper` tag.  See below:
        body
        center.wrapper.aycl
          div.webkit
            table.outer(align="center")
6. Edit the `{campaign_name}.pug` and `{campaign_name}.scss` file as needed.  Run `grunt` in the terminal for the compiled Mailchimp ready `HTNL` document found in `dist/pug/{campaign_name}.html`



## Bugs
- Pug will not interpolate variables in the attributes of tags when converting `pug` into `HTML`
- livereload in grunt watch is not working

## Concerns
- Is this overly complicated still, is there an even simpler way to run these tasks?
- Is this beneficial to "one time" emails, or better for long lasting reoccurring campaigns?
- How do I fix the file structure so it will only run what needs to be run?

## Todo
- [html entities](https://www.npmjs.com/package/grunt-htmlentities)
- css inlining - optional grunt command for testing templates
- markdown readability
- have the css include only include the necessary css
