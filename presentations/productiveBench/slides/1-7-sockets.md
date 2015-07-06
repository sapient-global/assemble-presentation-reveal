---
title: Sockets
presentation: productiveBench
classes:
  - slides-step_VerticalSlides
---
<section>
 <div class="ContentAligner">
    <div class="title__container ContentAligner-CenterLeft">
        <h1 class="SlideContentTitle u-sans u-bold">Multiplexing</h1>
        <div class="SlideTitleUnderline"></div>
    </div>
 <div class="ContentAligner-CenterRight">
       <h3 class="u-blue SlideContentSubtitle">Configuring socket.io</h3>
        <p>Glosary</p>
        <ul class="u-list-padding">
            <li>
                <p>master: The one who emits the event</p>
            </li>
            <li>
               <p>Client: The one who gets notified and perform the action</p>
            </li>
            <li>
                <p>Server: The one who served the socket</p>
            </li>
        </ul>
    </div>
</div>
</section>

<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Sockets</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
         <h3 class="u-blue SlideContentSubtitle">Master page</h3>
<pre><code data-trim class="javascript">
...
var socket = io.connect( multiplex.url );
...

var notify = function( slideElement, indexh, indexv, origin ) {
  ...
  var slideData = {
        indexh: indexh,
        indexv: indexv,
        indexf: fragmentindex,
        nextindexh: nextindexh,
        nextindexv: nextindexv,
        secret: multiplex.secret,
        socketId: multiplex.id
      };
      socket.emit( 'slidechanged', slideData );
  }
};
...
Reveal.addEventListener( 'slidechanged', function( event ) {
    notify( event.currentSlide, event.indexh, event.indexv, event.origin );
} );
</code></pre>
        </div>
    </div>
</section>


<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Sockets</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
         <h3 class="u-blue SlideContentSubtitle">Client page</h3>
<pre><code data-trim class="javascript">
...
var socket = io.connect( multiplex.url );
...

socket.on( multiplex.id, function( data ) {

  if ( data.socketId !== socketId ) {
    return;
  }
  if ( window.location.host !== 'localhost:1947' ) {
    return;
  }

  Reveal.slide( data.indexh, data.indexv, data.indexf, 'remote' );
} );
</code></pre>
        </div>
    </div>
</section>



<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Sockets</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
         <h3 class="u-blue SlideContentSubtitle">Server</h3>
<pre><code data-trim class="javascript">
...
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

...
</code></pre>
        </div>
    </div>
</section>
