'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const joi = require( 'joi' );

const lov = require( 'lov' );

const requireBlocker = require( 'require-blocker' );

const sinon = require( 'sinon' );

const freshy = require( 'freshy' );


const MODULE_PATH = '../../lib';

describe( 'lib/index', function() {

    let index;

    beforeEach( function() {

        requireBlocker.reset();

        index = require( MODULE_PATH );

    });

    after( function() {

        freshy.unload( MODULE_PATH );
    });

    describe( '.builder', function() {

        it( 'using defaults', function() {

            let builder = index.builder();

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
            expect( builder.engine ).to.equal( joi );
        });

        it( 'use lov when joi is not present', function() {

            requireBlocker.block( 'joi' );

            let builder = index.builder();

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
            expect( builder.engine ).to.equal( lov );
        });

        it( 'use custom validation engine', function() {

            let customEngine = {};

            let builder = index.builder( customEngine );

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
            expect( builder.engine ).to.equal( customEngine );
        });

        it( 'fail: when engines do not exist', function() {

            requireBlocker.block( 'joi', 'lov' );

            expect( index.builder.bind( null ) ).to.throw( 'cannot find validation engine' );
        });
    });

    describe( 'SchemaBuilder', function() {

        describe( 'build', function() {

            const controlStringSchema = { string: true };

            let builder;

            let engine = {};

            let stringSchema;

            beforeEach( function() {

                stringSchema = {

                    required: sinon.stub().returns( controlStringSchema )
                };

                builder = index.builder( engine );


                engine.string = sinon.stub().returns( stringSchema );
            });

            it( 'single value schema', function() {

                let schema = builder.build( 'string:required' );

                expect( schema ).to.equal( controlStringSchema );
            });

            it( '@schema property', function() {

                let schema = builder.build( {

                        type: 'string',
                        required: true,
                        '@schema': true
                    });

                expect( schema ).to.equal( controlStringSchema );
            });

            it( 'schema case', function() {

                let schema = builder.build( {

                        name: 'string:required'
                    });

                expect( schema ).to.eql( { name: controlStringSchema } );
            });
        });
    });
});
