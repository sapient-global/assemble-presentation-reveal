var port = process.env.PORT || 1947;
var host = process.env.HOST || process.env.HOSTNAME || ( process.env.NODE_ENV === 'production' ) ? '0.0.0.0' : 'localhost';
var socketUrl = 'http://' + host + ':' + port;


module.exports = {
  spriteUrl: {
    src: [ '<%= paths.src %>/scss/icons/_sprites-icons-sprite.scss' ], // source files array (supports minimatch)
    dest: '<%= paths.src %>/scss/icons/_sprites-icons-sprite.scss', // destination directory or file
    replacements: [ {
      from: '../../assets/img/', // string replacement
      to: '../img/'
    } ]
  },
  socketUrl: {
    src: [ '<%= paths.presentations %>/**/config.yml' ],
    overwrite: true,
    replacements: [ {
      from: /@socketUrl/g,
      to: socketUrl
    }, {
      from: 'http://localhost:1947',
      to: socketUrl
    } ]
  },
  revealResets: {
    src: [ '<%= paths.vendor %>/reveal.js/css/reveal.scss' ], // source files array (supports minimatch)
    dest: '<%= paths.vendor %>/reveal.js/css/reveal.scss', // destination directory or file
    replacements: [ {
      from: '.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre',
      to: 'h1, h2, h3, h4, h5, h6, p, blockquote, pre'
    }, {
      from: '.reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,',
      to: 'div, span, applet, object, iframe,'
    }, {
      from: '.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code',
      to: 'a, abbr, acronym, address, big, cite, code'
    }, {
      from: '.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\n.reveal b, .reveal u, .reveal center,\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\n.reveal time, .reveal mark, .reveal audio, video',
      to: 'del, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video'
    }, {
      from: '.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section',
      to: 'article, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section'
    } ]
  }
};
