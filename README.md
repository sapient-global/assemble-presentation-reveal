# About

Normally, web developers are doing brownbags. When they do, the tend to use offline apps, such as Powerpoint, which limits what we can do inside our presentation.

Using web presentations should be easy and quick, this tool, aims to making it easier. It uses standard tools, we web developers use in our daily work, such as assemble.io, grunt, yeoman, sass.

# Dependencies

You will need to have pre-installed in your computer:

* npm
* bower
* Yeoman

# Frontend architecture details

* libsass
* BEM-OOCSS naming convention
* Assemble to build the pages 
* grunt connect as server
* Yeoman generator to create new presentations, and in the future, new slides.

# Folder architecture

```
|- dist // Contains the built files for the server
|- configs
|- presentations // Folder with the presentations
|- src // Source code
```

# Creating new presentations

To create a new presentation, you will need to:

 1. Install Yeoman 
 2. Run the new presentation generator
```
yo reveal-presentation myAwesomePresentation
```
 3. Update reveal settings in your config.yml, though it is not required
 4. Start adding slides.

## Index and Master files

Within the folder of your presentation, you might have an index and master pages. 

The index page is the link you will give the attendees to access the presentation. 

The master page is the page you will use as presenter. If you are using sockets, then this will be required, because in this page the socket key will be added, and when you change a slide, the slide of the attendees will be changed as well.


## Creating slides (Still no generator)

### Naming
As long as the slide creation process is manual, in order to ensure the order of your slides in the presentation, you need to prepend to your slides name a number. ie:

```
|- 0-title.md
|- 1-agenda.md
|- 2-awesome-content.md
|- 3-thank-you.md
```
(Note:  use md for the slides)

### Slide data

The following data needs to be added in your slide:

```md
---
title: Title of the slide
*presentation: shortLinkNameForTheURL //Note that this is the same name you used for menuLink in the index.hbs*
classes:
 - CssClass1
 - CssClass1
slideDataAttr:
 - revealConfigDataAttr1: value
---
```

You can add as many classes or data attributes as you want. I owe you a list of possible options of data attributes supported by reveal. 

## Running and building the presentation in development mode

###Without sockets

To create the dist, run:
```js
grunt build
```

To run the server and watch your changes run :
```js
grunt serve
```

The default tasks builds everything and then runs the serve task
```js
grunt
```

### With sockets

To create the dist, run:
```js
grunt build
```

To create the dist, run:
```js
npm start
```

## Keyboard shortcuts

The default keyboard shortcuts are:

 - **Up, Down, Left, Right:** Navigation
 - **f:** Full-screen
 - **s:** Show slide notes
 - **o:** Toggle overview
 - **. (Period or b:** Turn screen black 
 - **Esc:** Escape from full-screen, or toggle overview


## Roadmap

- Add a generator for new slides
- Use SVN icons for logos
- Find a server in Sapient to deploy a presentation
- Enhance documentation

