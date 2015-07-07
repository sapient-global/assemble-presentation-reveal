( function() {
  'use strict';

  var multiplex = Reveal.getConfig().multiplex;
  var socketId = multiplex.id;
  var socket = io.connect( multiplex.url );

  socket.on( multiplex.id, function( data ) {

    if ( data.socketId !== socketId ) {
      return;
    }
    if (multiplex.url.indexOf(window.location.host) === -1 ) {
      return;
    }
    Reveal.slide( data.indexh, data.indexv, data.indexf, 'remote' );
  } );
}() );
