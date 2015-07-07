( function() {
  'use strict';

  var multiplex = Reveal.getConfig().multiplex;
  var socketId = multiplex.id;

  var host = window.location.host;

  if (window.location.port === '') {
   host += ':80/';
  }

  var socket = io.connect( host  );

  socket.on( multiplex.id, function( data ) {

    if ( data.socketId !== socketId ) {
      return;
    }
    Reveal.slide( data.indexh, data.indexv, data.indexf, 'remote' );
  } );
}() );
