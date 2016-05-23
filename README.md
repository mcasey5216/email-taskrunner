# HTML Email Template-making and Taskrunner

## Dependencies
Clone down this repository into your preferred directory.

```
$ git clone https://github.com/mcasey5216/email-taskrunner.git
```

[Install node.js](https://nodejs.org/en/download/)

If you do not have grunt or sass installed globally, in your terminal, from any directory, run these commands:

```
$ sudo npm install npm -g
$ sudo npm install -g grunt-cli
$ sudo gem install sass
```

In the main directory of this repository (where the `Gruntfile.js` is), install the dependencies.

```
$ sudo npm install
```

You can run the command `grunt --help` for more options or information.

Emails are written in `pug` format.  See more [here for syntax](http://jade-lang.com/reference/) or [here for overview and compatibility](https://github.com/pugjs/pug).  Note that `pug` was formally known as `Jade`.  If using Atom text editor, be sure to install the `language-pug` [package](https://atom.io/packages/language-pug) for readability.

## How to Use

In the command line of the main directory, run `$ grunt`.  To edit files, open the desired campaign html file created by grunt located in `dist/{campaign_name}.html` in a browser window.  In the command line, run `$ grunt watch`.  Any files in the main directories of `pug/` or `sass/` that are changed and saved while `grunt watch` is running will be recompiled and reflected in the associate `dist/` files.  To exit `grunt watch` hit `command + c`.  To get the final inlined template, run `$ grunt` in the command line.  The file will be located in `inlined/{campaign_name}.html`.

### Creating a New Template

1. Start by duplicating the `pug/index.pug` file and rename it the name of the campaign. e.g. `pug/{campaign_name}.pug`.  This contains all of the optional basic layouts, but in general all you need is the following.  As long as it is in the main `pug/` directory, it should work as expected.

  ``` pug
  extends layout

  block title
    title Master Template
    - var customClass=''

  block content

    // variables
    - var headerSource = " "
    - var headerAlt = " "

    - var nestedSubjectLine = " "

    // nested
    +nested(nestedSubjectLine)

    // header
    +header(headerSource, headerAlt)

    // body
    [contents go here]
  ```

2. Make an associated sass file in `sass/_{campaign_name}.scss`.  Don't forget the underscore at the beginning of the file name

3. In the `sass/style.scss` file add `@import '{campaign_name}';` to the top. Do not include the underscore or the `.scss` in this path name.

4. In the `sass/_{campaign_name}.scss` file, nest all of the contents into a larger class.  This will override general template formatting where necessary. Example:

  ```sass
  .aycl {
     .inner {
       padding: 30px;
    }
  }
  ```

5. In the `pug/{campaign_name}.pug`, you need to add the class the `center.wrapper` tag located in the `pug/layout.pug` file. (_note: do not change the layout.pug file_) This is achieved by nesting it in the `block title` portion of the `pug/{campaign_name}.pug` template.  The variable must be named `customClass`, and it must be set to the class name in the `sass/_{campaign_name}.scss` file. Example:

  ``` pug
  block title
    title Master Template
    - var customClass='aycl'
  ```

6. Edit the `{campaign_name}.pug` and `{campaign_name}.scss` file as needed.  Run `grunt` in the terminal for the compiled inlined Mailchimp ready `HTML` document found in `inlined/{campaign_name}.html`

### Standards

**Nested**: The nested line is preformatted and is stored in `pug/mixins/nested.pug`. It takes in one variable, which is the nested subject line.  It is called in this format `+nested(nestedSubjectLine)`  

**Header**: The header is preformatted and is stored in `pug/mixins/header.pug`. It takes in two variables, which is the source of the header image and the alt text.  It is called in this format `+header(headerSource, headerAlt)`

**Footer**: The footer is included in the `pug/layout.pug` file and accepts no variables.  For reference, it is located here: `pug/includes/footer.pug`

**Buttons**: Buttons are preformatted in the main `sass/style.scss` for the varying table cell widths. Buttons are also pre-coded and stored in `pug/mixins/buttons/`.  To use, call it in this format `+button(src, text)`.  If you are making a new button, be sure to include it at the top of the `pug/layout.pug` file. [Source](https://buttons.cm/).

**Pug Interpolation**: Know the difference between when to use the string interpolation, i.e. `#{ varName }` and not.  A general rule of thumb is that if it would have been in quotes if it were hard coded, it does not need the interpolation brackets.

Examples

``` pug
- var text = "this text"
- var link = "http://"

a(href=link) #{text}
```

will compile to

``` html
<a href="http://">that text</a>
```


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
