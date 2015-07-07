// Creating an express server
var express = require( 'express' ),
  app = express(),
  server = require( 'http' ).createServer( app ),
  fs = require( 'fs' ),
  path = require('path'),
  io = require( 'socket.io' )( server ),
  crypto = require( 'crypto' ),
  Mustache = require( 'mustache' ),
  opn = require( 'opn' ),
  livereload = require( 'livereload' ),
  watch = require( 'watch' );


var environment = process.env.NODE_ENV || 'development';
var isProd = function () { return environment === 'production'; }
var host;

if (isProd()) {
  host = '0.0.0.0';
} else {
  host = 'localhost';
}

var opts = {
  port: process.env.PORT || 1947,
  host:  process.env.HOST || process.env.HOSTNAME || host,
  baseDir: __dirname + '/dist',
  revealDir: __dirname + '/dist/vendor/reveal.js/'
};


var slidesLocation = 'http://' +opts.host + ( opts.port ? ( ':' + opts.port ) : '' );


var createHash = function( secret ) {
  var cipher = crypto.createCipher( 'blowfish', secret );
  var final = cipher.final( 'hex' );
  return ( final );
};

server.listen( opts.port, opts.host, function() {
  var green = '\033[32m',
      reset = '\033[0m';
  console.log( "Presentation server running on " + green + opts.host + reset + "\nWeb Sockets running on port " + green + opts.port + reset );
} );

app.use( express.static( opts.baseDir ) );

app.get( "/", function( req, res ) {
  res.writeHead( 200, {
    'Content-Type': 'text/html'
  } );
  fs.createReadStream( path.join(opts.baseDir , '/index.html') ).pipe( res );
} );

app.get( '/token', function( req, res ) {
  var ts = new Date().getTime();
  var rand = Math.floor( Math.random() * 9999999 );
  var secret = ts.toString() + rand.toString();
  res.send( {
    secret: secret,
    socketId: createHash( secret )
  } );
} );

app.get( '/notes/:socketId', function( req, res ) {
  fs.readFile( opts.revealDir + 'plugin/notes-server/notes.html', function( err, data ) {
    res.send( Mustache.to_html( data.toString(), {
      socketId: req.params.socketId
    } ) );
  } );
} );

io.sockets.on( 'connection', function( socket ) {

  socket.on( 'connect', function( data ) {
    socket.broadcast.emit( 'connect', data );
  } );

  socket.on( 'statechanged', function( data ) {
    socket.broadcast.emit( 'statechanged', data );
  } );

  socket.on( 'slidechanged', function( slideData ) {
    if ( typeof slideData.secret == 'undefined' || slideData.secret == null || slideData.secret === '' ) return;
    var currentSocketId = createHash( slideData.secret );
    if ( currentSocketId === slideData.socketId ) {
      slideData.secret = null;
      socket.broadcast.emit( slideData.socketId, slideData );
    };
  } );
} );

if (!isProd()){
  opn( slidesLocation );
}
