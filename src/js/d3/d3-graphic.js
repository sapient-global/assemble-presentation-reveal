/* global d3 */
( function() {
  'use strict';

  var createD3Image = function() {
  };

  if ( d3 ) {
    createD3Image();
  } else {
    setTimeout(createD3Image, 500);
  }

} )();
