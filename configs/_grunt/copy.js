module.exports = {
  dist: {
    files: [ {
      expand: true,
      cwd: '<%= paths.src %>/vendor/reveal.js/',
      src: [ '**/notes.html' ],
      dest: '<%= paths.dist %>/vendor/reveal.js/'
    } ]
  }
};
