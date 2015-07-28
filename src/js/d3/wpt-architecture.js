/* global d3 */
( function() {
  'use strict';

  var createArchitectureSVG = function() {
    var width = 700,
      height = 450,
      x = d3.scale.linear().range( [ 0, width ] ),
      y = d3.scale.linear().range( [ 0, height ] );

    var svg = d3.select( '.wpt-architecture' )
      .append( 'svg:svg' )
      .attr( 'width', width )
      .attr( 'height', height );

    var partition = d3.layout.partition()
      .value( function( d ) {
        return d.size;
      } );

    d3.json( '/assets/d3-data/wpt-architecture.json', function( root ) {


      function transform( d ) {
        return 'translate(8,' + d.dx * ky / 2 + ')';
      }


      var node = svg.selectAll( 'g' )
        .data( partition.nodes( root ) )
        .enter().append( 'svg:g' )
        .attr( 'transform', function( d ) {
          return 'translate(' + x( d.y ) + ',' + y( d.x ) + ')';
        } );

      var kx = width / root.dx,
        ky = height / 1;

      node.append( 'svg:rect' )
        .attr( 'width', root.dy * kx )
        .attr( 'height', function( d ) {
          return d.dx * ky;
        } )
        .attr( 'class', function( d ) {
          var className = 'parent';
          if ( d.parent && d.children ) {
            className = 'mid';
          } else if ( !d.children && d.parent ) {
            className = 'child';
          }
          return className;

        } );

      node.append( 'svg:text' )
        .attr( 'transform', transform )
        .attr( 'dy', '.35em' )
        .text( function( d ) {
          return d.name;
        } )
        .attr( 'class', function( d ) {
          var className = 'parent';
          if ( d.parent && d.children ) {
            className = 'mid';
          } else if ( !d.children && d.parent ) {
            className = 'child';
          }
          return className;

        } );

    } );
  };

  if ( d3 ) {
    createArchitectureSVG();
  } else {
    setTimeout(createArchitectureSVG, 300);
  }

} )();
