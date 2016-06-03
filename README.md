# HTML Email Template-making and Taskrunner

This app is designed to help make html email templates through pug (formerly known as jade) and sass files, executed through a simple command line interface.  This app will compile the pug and sass files into html and css respectively.  It will also inline the css and encode special characters so it is ready for a email deployment system (in our case, MailChimp).

## Table of Contents

1. Dependencies
2. How to Use
  1. How it Works
  2. Creating a New Template
  3. Standards  
    1. Nested
    2. Header
    3. Fotter
    4. Buttons
    5. Pug Interpolation
3. Bugs
4. Todo
5. HtmL Emails, Standards and Practices
  1. General Guidelines
    1. CSS Support and Inlining
    2. Images
    3. Unsupported Tags and Attributes
6. Notes on Pug
7. Notes on Sass

## Dependencies
Clone down this repository into your preferred directory.

```
$ git clone https://github.com/mcasey5216/email-taskrunner.git
```

[Install node.js](https://nodejs.org/en/download/)

If you do not have grunt or sass installed globally, in your terminal, from any directory, run these commands:

```
$ npm install npm -g
$ npm install -g grunt-cli
$ gem install sass
```

In the main directory of this repository (where the `Gruntfile.js` is), install the dependencies.

```
$ npm install
```

You can run the command `grunt --help` for more options or information.

Emails are written in `pug` format.  See more [here for syntax](http://jade-lang.com/reference/) or [here for overview and compatibility](https://github.com/pugjs/pug).  Note that `pug` was formally known as `Jade`.  If using Atom text editor, be sure to install the `language-pug` [package](https://atom.io/packages/language-pug) for readability.

## How to Use

In the command line of the main directory, run `$ grunt`.  To edit files, open the desired campaign html file created by grunt located in `dist/{campaign_name}.html` in a browser window.  In the command line, run `$ grunt watch`.  Any files in the main directories of `pug/` or `sass/` that are changed and saved while `grunt watch` is running will be recompiled and reflected in the associate `dist/` files.  To exit `grunt watch` hit `control + c`.  To get the final inlined template, run `$ grunt` in the command line.  The file will be located in `inlined/{campaign_name}.html`.

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

## HTML Emails, Standards and Practices

There are dozens of email clients and devices on which to view an HTML email, but there isn't a solid standard of practice on which to build them.  The following are some notes on what should and should not be done.

![email clients](/images/demystifying-email-rendering.png)

Graphic of different email clients. ([source](http://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908))

But these are the most common

Mobile clients
- Android 2.3 & 4.0
- iPhone 5  iOS 6
- iPhone 4S  iOS 6
- iPhone 3GS  iOS 5
- iPad 2  iOS 6
- BlackBerry OS 4 & 5
- Symbian S60
- Windows Phone 7.5

Desktop clients
- Apple Mail 4, 5, 6
- Lotus Notes 8.5
- Lotus Notes 8
- Thunderbird
- Windows Live Mail
- Outlook 2013
- Outlook 2011 for Mac
- Outlook 2010
- Outlook 2007
- Outlook 2003
- Outlook 2002/XP
- Outlook 2000

Webmail clients
- AOL Mail (on any browser)
- Gmail (on any browser)
- Outlook.com (on any browser)
- Yahoo! (on any browser)

### General Guidelines

Most of the inspiration for this style of templating originates from [here](http://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908).  Do not make any significant changes to the `layout.pug` file with referencing this link.

**CSS Support and Inlining**:

Some email clients, like the Gmail app, will not read media queries.  We will work with a "fluid layout". (_note, outlook will not read fluid layouts, it strips max-width attributes.  media queries should be added at a later date for full coverage_) Some sacrifices in design are made, but ultimately it is the best way to reach the most subscribers with an email that looks as close as possible to the original idea.  

Most clients strip and style tags.  Styles must ultimately be inlined. MailChimp will do it for you, but to take out the ambiguity, there is a grunt task assigned this.

Be careful with the inlining process.  Be sure to test every new email extensively, and run some preliminary checks on existing templates.

You can not use shorthand `CSS` styles for things like `border`, `font`, or `padding`.  

``` css
table {
  padding: 10px 20px 10px;
}
```

becomes:

``` css
table {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
}
```

When setting width or height attributes, make sure to set it in the `CSS` and as an attribute on the actual tag.

``` css
// CSS
img {
  width: 400px;
}
```

``` html
// HTML
<img src="path/to/image.jpg" width="400" />
```

**Images**:

Many email clients turn off images by default.  Never uses an image that has crucial information in it, and always give it an `alt` attribute.  Lengthy alt text can result in it not displaying properly.  [This article](https://www.campaignmonitor.com/dev-resources/will-it-work/alt/) explains some of issues and details related to image alt text.  Alt Text can and should be styled, but there is no once size fits all solution to broken alt text, so be mindful of it's length and test its appearance.  I suggest turning images off as a default in your own email as a way to check when you send yourself tests.

Always link your images, including headers.

Background images are not suggested, but [here is a link](https://backgrounds.cm/) to a supposedly bulletproof way of handling it.

**Unsupported Tags and Attributes**:

The `div`, `section`, and `article` tags are not supported in any reliable way.  Email templates should be built in nested tables since the `colspan` and `rowspan` attributes are not consistently supported. Your largest table should be no more than 600px wide.  It is the best number to ensure your users will not have to scroll horizontally.

Some clients will strip certain tags, such as `h1`, `h2`, and `h3` (as well as `p` tags in some cases), so h tags are formatted as such: `<p class="h1"> ... </p>`.  When possible, simply skip the p tag altogether. Example:

``` html
<tr>
  <td style=“font-size: 12px; font-family: Arial, sans-serif; color: #666666;”>
    Text
  </td>
</tr>
```

## Notes on Pug

## Notes on Grunt
