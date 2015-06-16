// Creating an express server
var express = require( 'express' ),
    app = express(),
    fs = require( 'fs' ),
    io = require( 'socket.io' ),
    crypto = require( 'crypto' ),
    Mustache = require('mustache');

var opts = {
  port:  process.env.PORT || 1947,
  host: '0.0.0.0',
  baseDir: __dirname + '/dist',
  revealDir:  __dirname + '/dist/vendor/reveal.js/'
};


var createHash = function( secret ) {
  var cipher = crypto.createCipher( 'blowfish', secret );
  return ( cipher.final( 'hex' ) );
};

app.use( express.static( opts.baseDir ) );
io = io.listen( app.listen( opts.port, opts.host ));

app.get( '/token', function( req, res ) {
  var ts = new Date().getTime();
  var rand = Math.floor( Math.random() * 9999999 );
  var secret = ts.toString() + rand.toString();
  res.send( {
    secret: secret,
    socketId: createHash( secret )
  } );
});

app.get( '/notes/:socketId', function( req, res ) {
  fs.readFile( opts.revealDir + 'plugin/notes-server/notes.html', function( err, data ) {
    res.send( Mustache.to_html( data.toString(), {
      socketId : req.params.socketId
    }));
  });
});


app.get( "/", function( req, res ) {
  res.writeHead( 200, {
    'Content-Type': 'text/html'
  } );
  fs.createReadStream( opts.baseDir + '/index.html' ).pipe( res );
});


io.sockets.on( 'connection', function( socket ) {
  socket.on( 'connect', function( data ) {
    socket.broadcast.emit( 'connect', data );
  });

  socket.on( 'statechanged', function( data ) {
    socket.broadcast.emit( 'statechanged', data );
  });

  socket.on( 'slidechanged', function( slideData ) {
    if ( typeof slideData.secret == 'undefined' || slideData.secret == null || slideData.secret === '' ) return;
    var currentSocketId =  createHash( slideData.secret );
    if ( currentSocketId === slideData.socketId ) {
      slideData.secret = null;
      socket.broadcast.emit( slideData.socketId, slideData );
    };
  });
});

var brown = '\033[33m',
  green = '\033[32m',
  reset = '\033[0m';
  var slidesLocation = 'http://localhost' + ( opts.port ? ( ':' + opts.port ) : '' );

console.log( brown + "Presentation Server Runing:" + opts.host + reset + " Web Sockets running on port " + green + opts.port + reset );
console.log( brown + 'reveal.js - Speaker Notes' + reset );
console.log( '1. Open the slides at ' + green + slidesLocation + reset );
console.log( '2. Click on the link your JS console to go to the notes page' );
console.log( '3. Advance through your slides and your notes will advance automatically' );

