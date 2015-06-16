module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [ {
      expand: true,
      cwd: '<%= paths.dist %>',
      src: [ '**/*.html' ],
      dest: '<%= paths.dist %>/'
    } ]
  }
};
