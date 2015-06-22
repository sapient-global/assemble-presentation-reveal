#todo

write an assemble plugin to pass the config.yml data of each presentation to the index
write another plugin not to render the slides as a single html

# About this template

In this master branch you will find a template to create web presentations using the standard Sapient corporate theme.

# Dependencies

You will need to have pre-installed in your computer:

* npm
* bower

# Frontend architecture details

* libsass
* BEM-OOCSS naming convention
* Assemble to build the pages 
* grunt connect as server

# Folder architecture

|
|- _output // Contains the built files for the server
|- configs
|- presentations // Folder with the presentations
|- src // Source code


# Creating new presentations

To create a new presentation, you will need to:
1. Create a subFolder with the name of your presentation under: "presentations"
2. Add a folder there called: slides
3. Next to the slides folder, create an index.hbs file


## Index of presentation

Your index file, needs to contain the next data:

```md
---
title: Title of your presentation.. Will be used for the title of the HTML
menuLink: shortLinkNameForTheURL
---
```


## Creating slides
When you need to create a new slide, you will need to add the next data to them:
(Note: you can use either hbs or md for the slides)

```md
---
title: Title of the slide
presentation: shortLinkNameForTheURL //Note that this is the same name you used for menuLink
classes:
 - CssClass1
 - CssClass1
slideDataAttr:
 - revealConfigDataAttr1: value
---
```

You can add as many classes or data attributes as you want. I owe you a list of possible options of data attributes supported by reveal. 

## Running and building the presentation

To create the dist, run:
```js
grunt build
```

To run the server and watch your changes run:
```js
grunt serve
```


The default tasks builds everything and then runs the serve task
```js
grunt
```

## Keyboard shortcuts

The default keyboard shortcuts are:

Up, Down, Left, Right: Navigation
f: Full-screen
s: Show slide notes
o: Toggle overview
. (Period or b: Turn screen black
Esc: Escape from full-screen, or toggle overview


## Next ideas
- Add a generator for new presentations and slides
- Maybe transform this in a generator?
- Clean up CSS
- Add plugins
- Use SVN icons for logos
- Add multiplexing
- Make a decent index page

