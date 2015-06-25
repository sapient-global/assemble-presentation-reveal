/*
 * PERFORMANCE
 *
 * 1. For performance reasons you should only matching one level down, if possible.
 * 2. Try to keep your watch task clean. Do NOT watch everything (like icons).
 * 3. Add 'spawn: false' to your watch task when you need to speed up your build.
 *
 */

module.exports = function( grunt ) {
  'use strict';
  // load only used tasks and add fallbacks for those which cannot be find
  require( 'jit-grunt' )( grunt, {
    'replace': 'grunt-text-replace'
  } );
  // measures the time each task takes
  require( 'time-grunt' )( grunt );

  var options = {
    // Project settings
    config: {
      // in this directory you can find your grunt config tasks
      src: 'configs/_grunt/*.js'
    },
    // define your path structure
    paths: {
      // helpers folder with grunt tasks and templates, tests and photobox
      configs: 'configs',
      // src folder with working files
      src: 'src',
      dist: 'dist',
      vendor: 'src/vendor',
      presentations: 'presentations'
    },
    // define your ports for grunt-contrib-connect
    ports: {
      app: 3000,
      test: 3001,
      livereload: 35731
    }
  };

  // Load grunt configurations automatically
  var configs = require( 'load-grunt-configs' )( grunt, options );

  // Define the configuration for all the tasks
  grunt.initConfig( configs );

  /*
   *  SIMPLE TASKS
   */

  grunt.registerMultiTask( 'clean', function() {
    var options = this.options();
    this.filesSrc.forEach( function( filepath ) {
      grunt.log.writeln( 'DELETING ' + filepath );
      grunt.file.delete( filepath, options );
    } );
  } );

  // SASS Task
  grunt.registerTask( 'watchCSS', [
    'replace:revealResets',
    'sass:dist'
  ] );

  // Sprites Task
  grunt.registerTask( 'icons', [
    'dr-svg-sprites',
    'replace:spriteUrl'
  ] );


  // Sync JS Task
  grunt.registerTask( 'syncJS', [
    'sync:js'
  ] );

  // Build HTML Task
  grunt.registerTask( 'build-html', [
    'assemble',
    'htmlmin',
    'copy'
  ] );

  // HTML Hint Task (Check your HTML)
  grunt.registerTask( 'check-html', [
    'htmlhint'
  ] );
  // JS Hint Task (Check you JS)
  grunt.registerTask( 'check-js', [
    'jshint'
  ] );


  /*
   *  ADVANCED TASKS
   */
  grunt.registerTask( 'server', [
    'newer:assemble',
    'copy',
    'concurrent:syncing',
    'watchCSS',
    'connect:livereload',
    'watch'
  ] );

  grunt.registerTask( 'build', [
    'clean:all',
    'concurrent:syncing',
    'watchCSS',
    'combine_mq',
    'cssmin',
    'assemble',
    'htmlmin',
    'copy',
    'concurrent:build'
  ] );

  grunt.registerTask( 'default', [
    'build',
    'server'
  ] );

  // alias serve by grunt convention
  grunt.registerTask( 'serve', [
    'server'
  ] );
};
