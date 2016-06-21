'use strict';

/*jshint expr: true*/

const convert = require( '../../lib/convert' );

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

    [ 'sparse', 'single', 'truncate', 'isRaw' ].forEach( function( key ) {

        it( 'boolean type: ' + key, function() {

            expect( convert( 'any', key, undefined ) ).to.be.true;
            expect( convert( 'any', key, 'true' ) ).to.be.true;
            expect( convert( 'any', key, true ) ).to.be.true;

            expect( convert( '_default', key, 'true' ) ).to.be.true;
            expect( convert( '_default', key, true ) ).to.be.true;
        });
    });

    it( 'unknown key', function() {

        expect( convert( 'any', 'special', '42' ) ).to.equal( '42' );
    });
});
