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
4. In the `sass/_{campaign_name}.scss` file, nest all of the contents into a larger class.  This will override general template formatting where necessary.

    .aycl {
      .inner {
        padding: 30px;
      }
    }

5. In the `pug/{campaign_name}.pug`, add the class the `center.wrapper` tag.  See below:
        body
        center.wrapper.aycl
          div.webkit
            table.outer(align="center")
6. Edit the `{campaign_name}.pug` and `{campaign_name}.scss` file as needed.  Run `grunt` in the terminal for the compiled Mailchimp ready `HTNL` document found in `dist/pug/{campaign_name}.html`

### Standards

**Buttons**: Buttons are preformatted in the main `sass/style.scss` for the varying table cell widths. Buttons are also pre-coded and stored in `pug/includes/button.pug`.  To use, include the mixin at the top of the file with `include includes/button.pug`, and to create the button call it in this format `+button(src, text)`.  The source and text can be hard coded or use variables relevant to the current template.

**Pug Interpolation**: Know the difference between when to use the string interpolation, i.e. `#{ varName }` and not.  A general rule of thumb is that if it would have been in quotes if it were hard coded, it does not need the interpolation brackets.

Examples

    - var text = "this text"
    - var link = "http://"

    a(href=link) #{text}

will compile to

    <a href="http://">that text</a>


## Bugs
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
