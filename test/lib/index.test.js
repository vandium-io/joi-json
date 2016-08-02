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
            expect( builder.parser.engine ).to.equal( joi );
        });

        it( 'use lov when joi is not present', function() {

            requireBlocker.block( 'joi' );

            let builder = index.builder();

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
            expect( builder.parser.engine ).to.equal( lov );
        });

        it( 'use custom validation engine', function() {

            let customEngine = {};

            let builder = index.builder( customEngine );

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
            expect( builder.parser.engine ).to.equal( customEngine );
        });

        it( 'fail: when engines do not exist', function() {

            requireBlocker.block( 'joi', 'lov' );

            expect( index.builder.bind( null ) ).to.throw( 'cannot find validation engine' );
        });
    });

    describe( 'SchemaBuilder', function() {

        describe( 'build', function() {

            let builder;

            let engine = {};

            let stringSchema;

            beforeEach( function() {

                stringSchema = {};

                stringSchema.required = sinon.stub().returns( stringSchema );
                stringSchema.trim =sinon.stub().returns( stringSchema );

                builder = index.builder( engine );

                engine.string = sinon.stub().returns( stringSchema );
            });

            it( 'single value schema', function() {

                let schema = builder.build( 'string:required' );

                expect( schema ).to.equal( stringSchema );

                expect( stringSchema.required.calledOnce ).to.be.true;
            });

            it( '@schema property', function() {

                let schema = builder.build( {

                        type: 'string',
                        required: true,
                        '@schema': true
                    });

                expect( schema ).to.equal( stringSchema );

                expect( stringSchema.required.calledOnce ).to.be.true;
            });

            it( 'schema case', function() {

                let schema = builder.build( {

                        name: 'string:required'
                    });

                expect( schema ).to.eql( { name: stringSchema } );

                expect( stringSchema.required.calledOnce ).to.be.true;
            });
        });
    });

    describe( 'Joi schema cases', function() {

        it( 'string', function() {

            let parser = index.parser( joi );

            let schema = parser.parse( 'string: min=1, max=60, required' );

            expect( schema.isJoi ).to.be.true;
            expect( schema._type ).to.equal( 'string' );
            expect( schema._tests.length ).to.equal( 3 );

            expect( schema._tests[0].name ).to.equal( 'min' );
            expect( schema._tests[0].arg ).to.equal( 1 );

            expect( schema._tests[1].name ).to.equal( 'max' );
            expect( schema._tests[1].arg ).to.equal( 60 );

            expect( schema._tests[2].name ).to.equal( 'trim' );

            expect( schema._flags.presence ).to.equal( 'required' );
            expect( schema._flags.trim ).to.be.true;
        });

        it( 'uuid', function() {

            let parser = index.parser( joi );

            let schema = parser.parse( 'uuid:required' );

            expect( schema.isJoi ).to.be.true;
            expect( schema._type ).to.equal( 'string' );
            expect( schema._tests.length ).to.equal( 2 );

            expect( schema._tests[0].name ).to.equal( 'guid' );
            expect( schema._tests[1].name ).to.equal( 'trim' );

            expect( schema._flags.presence ).to.equal( 'required' );
            expect( schema._flags.trim ).to.be.true;
        });

        it( 'email', function() {

            let parser = index.parser( joi );

            let schema = parser.parse( 'email:required' );

            expect( schema.isJoi ).to.be.true;
            expect( schema._type ).to.equal( 'string' );
            expect( schema._tests.length ).to.equal( 2 );

            expect( schema._tests[0].name ).to.equal( 'email' );
            expect( schema._tests[1].name ).to.equal( 'trim' );

            expect( schema._flags.presence ).to.equal( 'required' );
            expect( schema._flags.trim ).to.be.true;
        });

        it( 'number', function() {

            let parser = index.parser( joi );

            let schema = parser.parse( 'number:min=1,max=10,required' );

            expect( schema.isJoi ).to.be.true;
            expect( schema._type ).to.equal( 'number' );
            expect( schema._tests.length ).to.equal( 2 );

            expect( schema._tests[0].name ).to.equal( 'min' );
            expect( schema._tests[0].arg ).to.equal( 1 );

            expect( schema._tests[1].name ).to.equal( 'max' );
            expect( schema._tests[1].arg ).to.equal( 10 );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'boolean', function() {

            let parser = index.parser( joi );

            let schema = parser.parse( 'boolean:required' );

            expect( schema.isJoi ).to.be.true;
            expect( schema._type ).to.equal( 'boolean' );
            expect( schema._tests.length ).to.equal( 0 );

            expect( schema._flags.presence ).to.equal( 'required' );
        });
    });
});
