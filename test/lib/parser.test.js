'use strict';

/*jshint expr: true*/

const Parser = require( '../../lib/parser' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/parser', function() {

    let engine;

    let stringSchema;

    let objectSchema;

    let arraySchema;

    let numberSchema;

    let booleanSchema;

    let alternativesSchema;

    beforeEach( function() {

        stringSchema = { };

        stringSchema.required = sinon.stub().returns( stringSchema );
        stringSchema.max = sinon.stub().returns( stringSchema );
        stringSchema.trim = sinon.stub().returns( stringSchema );

        objectSchema = { };

        objectSchema.required = sinon.stub().returns( objectSchema );
        objectSchema.keys = sinon.stub().returns( objectSchema );

        arraySchema = { };
        arraySchema.max = sinon.stub().returns( arraySchema );
        arraySchema.items = sinon.stub().returns( arraySchema );
        arraySchema.required = sinon.stub().returns( stringSchema );


        numberSchema = {};
        numberSchema.required = sinon.stub().returns( numberSchema );

        alternativesSchema = {};
        alternativesSchema.try = sinon.stub().returns( alternativesSchema );

        booleanSchema = {};
        booleanSchema.required = sinon.stub().returns( booleanSchema );

        engine = {

            string: sinon.stub().returns( stringSchema ),
            array: sinon.stub().returns( arraySchema ),
            object: sinon.stub().returns( objectSchema ),
            alternatives: sinon.stub().returns( alternativesSchema ),
            number: sinon.stub().returns( numberSchema ),
            boolean: sinon.stub().returns( booleanSchema ),
        };
    });

    describe( 'Parser', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let parser = new Parser( engine );

                expect( parser.engine ).to.equal( engine );
            });

            it( 'fail: when engine is missing', function() {

                try {

                    new Parser();

                    throw new Error( 'failed to throw exception for missing engine' );
                }
                catch( err ) {

                    expect( err.message ).to.equal( 'missing engine' );
                }
            });
        });

        describe( '.parse', function() {

            let parser;

            beforeEach( function() {

                parser = new Parser( engine );
            });

            it( 'string notation with properties', function() {

                parser.parse( 'string:max=1,required' );

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.required.calledOnce ).to.be.true;
                expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.max.calledOnce ).to.be.true;
                expect( stringSchema.max.withArgs( 1 ).calledOnce ).to.be.true;
            });

            it( 'string notation without properties', function() {

                parser.parse( 'string' );

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.required.called ).to.be.false;
                expect( stringSchema.max.called ).to.be.false;
            });

            it( 'string type', function() {

                let returnValue = parser.parse( 'string:required' );

                expect( returnValue ).to.equal( stringSchema );

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.required.calledOnce ).to.be.true;
                expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.trim.calledOnce ).to.be.true;
                expect( stringSchema.trim.withArgs().calledOnce ).to.be.true;
            });

            [ 'boolean', 'number', 'any', 'date', 'binary' ].forEach( function( type ) {

                it( type + ' type', function() {

                    let testSchema = { test: true };

                    let typeSchema = {

                        required: sinon.stub().returns( testSchema )
                    };

                    engine[ type ] = sinon.stub().returns( typeSchema );

                    let returnValue = parser.parse( `${type}:required` );

                    expect( returnValue ).to.equal( testSchema );

                    expect( engine[ type ].calledOnce ).to.be.true;
                    expect( engine[ type ].withArgs().calledOnce ).to.be.true;

                    expect( typeSchema.required.calledOnce ).to.be.true;
                    expect( typeSchema.required.withArgs().calledOnce ).to.be.true;
                });
            });


            it( 'object type (without type property)', function() {

                let config = {

                    firstName: 'string:required',
                    lastName: 'string:required',
                    '@required': true
                };

                let firstNameSchema = { name: 'first' };
                let lastNameSchema = { name: 'last' };

                stringSchema.required.onFirstCall().returns( stringSchema );
                stringSchema.required.onSecondCall().returns( stringSchema );

                stringSchema.trim.onFirstCall().returns( firstNameSchema );
                stringSchema.trim.onSecondCall().returns( lastNameSchema );

                parser.parse( config );

                expect( engine.object.calledOnce ).to.be.true;
                expect( engine.object.withArgs().calledOnce ).to.be.true;

                expect( objectSchema.keys.calledOnce ).to.be.true;
                expect( objectSchema.keys.withArgs( { firstName: firstNameSchema, lastName: lastNameSchema } ).calledOnce ).to.be.true;

                expect( objectSchema.required.calledOnce ).to.be.true;
                expect( objectSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });

            it( 'array type', function() {

                let config = {

                    friends: {

                        '@items': 'string:max=100',
                        max: 5,
                        required: true
                    }
                };

                parser.parse( config );

                expect( engine.array.calledOnce ).to.be.true;
                expect( engine.array.withArgs().calledOnce ).to.be.true;

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.max.calledOnce ).to.be.true;
                expect( stringSchema.max.withArgs(100).calledOnce ).to.be.true;

                expect( arraySchema.items.calledOnce ).to.be.true;
            });

            it( 'alternatives type (with type specified)', function() {

                let config = {

                    '@type': 'alternatives',
                    try: [ 'number:required', 'string:required' ]
                };

                let schema1 = { one: 1};
                numberSchema.required.returns( schema1 );

                let schema2 = { two: 2};
                stringSchema.required.returns( stringSchema );
                stringSchema.trim.returns( schema2 );

                parser.parse( config );

                expect( engine.alternatives.calledOnce ).to.be.true;
                expect( engine.alternatives.withArgs().calledOnce ).to.be.true;

                expect( alternativesSchema.try.calledOnce ).to.be.true;
                expect( alternativesSchema.try.withArgs( schema1, schema2 ).calledOnce ).to.be.true;
            });

            it( 'alternatives type (using short form: [])', function() {

                let config = [ 'number:required', 'string:required' ];

                let schema1 = { one: 1};
                numberSchema.required.returns( schema1 );

                let schema2 = { two: 2};
                stringSchema.required.returns( stringSchema );
                stringSchema.trim.returns( schema2 );


                parser.parse( config );

                expect( engine.alternatives.calledOnce ).to.be.true;
                expect( engine.alternatives.withArgs().calledOnce ).to.be.true;

                expect( alternativesSchema.try.calledOnce ).to.be.true;
                expect( alternativesSchema.try.withArgs( schema1, schema2 ).calledOnce ).to.be.true;
            });

            it( 'unknown type', function() {

                let config = 'special:required';

                expect( parser.parse.bind( parser, config ) ).to.throw( 'unknown type: special' );
            });

            it( 'with additional spaces between properties', function() {

                let returnValue = parser.parse( 'string: max=60, trim, required' );

                expect( returnValue ).to.equal( stringSchema );

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.max.calledOnce ).to.be.true;
                expect( stringSchema.max.withArgs( 60 ).calledOnce ).to.be.true;

                expect( stringSchema.required.calledOnce ).to.be.true;
                expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.trim.calledOnce ).to.be.true;
                expect( stringSchema.trim.withArgs().calledOnce ).to.be.true;
            });
        });

        describe( '.buildSchema', function() {

            it( 'normal operation', function() {

                let testSchema = { string: true };

                let stringSchema = { };

                stringSchema.required = sinon.stub().returns( stringSchema );
                stringSchema.trim = sinon.stub().returns( testSchema );

                let engine = {

                    string: sinon.stub().returns( stringSchema )
                };

                let returnValue = Parser.buildSchema( { name: 'string:required' }, engine );

                expect( returnValue ).to.eql( { name: testSchema } );

                expect( engine.string.calledOnce ).to.be.true;
                expect( engine.string.withArgs().calledOnce ).to.be.true;

                expect( stringSchema.required.calledOnce ).to.be.true;
                expect( stringSchema.required.withArgs().calledOnce ).to.be.true;
            });
        });
    });
});
