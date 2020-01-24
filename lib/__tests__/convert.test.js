'use strict';

/*jshint expr: true*/

const convert = require( '../convert' );

const expect = require( 'chai' ).expect;

describe( 'lib/convert', function() {

    [ 'min', 'max', 'length', 'greater', 'less', 'precision', 'multiple' ].forEach( function( key ) {

        it( 'number type: ' + key, function() {

            expect( convert( 'any', key, '100' ) ).to.equal( 100 );
            expect( convert( 'any', key, 100 ) ).to.equal( 100 );

            expect( convert( '_default', key, '100' ) ).to.equal( 100 );
            expect( convert( '_default', key, 100 ) ).to.equal( 100 );
        });
    });

    [ 'sparse', 'single', 'truncate', 'isRaw', 'strip' ].forEach( function( key ) {

        it( 'boolean type: ' + key, function() {

            expect( convert( 'any', key, undefined ) ).to.be.true;
            expect( convert( 'any', key, 'true' ) ).to.be.true;
            expect( convert( 'any', key, true ) ).to.be.true;

            expect( convert( '_default', key, 'true' ) ).to.be.true;
            expect( convert( '_default', key, true ) ).to.be.true;
        });
    });

    [ 'allow' ].forEach( function( key ) {

        it( 'allow types: ' + key, function() {

            expect( convert( 'number', key, '100' ) ).to.equal( 100 );
            expect( convert( 'number', key, 100 ) ).to.equal( 100 );
            expect( convert( 'number', key, 'null' ) ).to.be.null;

            expect( convert( 'boolean', key, undefined ) ).to.be.true;
            expect( convert( 'boolean', key, 'true' ) ).to.be.true;
            expect( convert( 'boolean', key, true ) ).to.be.true;
            expect( convert( 'boolean', key, 'null' ) ).to.be.null;

            expect( convert( '_default', key, '100' ) ).to.equal( '100' );
            expect( convert( '_default', key, 100 ) ).to.equal( 100 );
            expect( convert( '_default', key, 'true' ) ).to.equal( 'true' );
            expect( convert( '_default', key, true ) ).to.be.true;
            expect( convert( '_default', key, 'null' ) ).to.be.null;

        });
    });

    it( 'unknown key', function() {

        expect( convert( 'any', 'special', '42' ) ).to.equal( '42' );
    });
});
