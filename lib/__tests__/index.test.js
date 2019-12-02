const proxyquire = require( 'proxyquire' );

const { expect } = require( 'chai' );

const sinon = require( 'sinon' );

const SchemaInspector = require( './inspector' );

describe( 'lib/index', function() {

    let index;

    let engine;

    beforeEach( function() {

        engine = {};

        index = proxyquire( '../index', {

            '@hapi/joi': engine
        });
    });

    describe( '.builder', function() {

        it( 'normal operation', function() {

            let builder = index.builder();

            expect( builder.constructor.name ).to.equal( 'SchemaBuilder' );
        });
    });

    describe( 'SchemaBuilder', function() {

        describe( 'build', function() {

            let builder;

            let stringSchema;

            beforeEach( function() {

                stringSchema = {};

                stringSchema.required = sinon.stub().returns( stringSchema );
                stringSchema.trim =sinon.stub().returns( stringSchema );

                builder = index.builder();

                engine.string = sinon.stub().returns( stringSchema );
            });

            it( 'single value schema', function() {

                let schema = builder.build( 'string:required' );

                expect( schema ).to.equal( stringSchema );

                expect( stringSchema.required.calledOnce ).to.be.true;
            });

            it( '@schema property', function() {

                let schema = builder.build( {

                        '@type': 'string',
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

        const joi = require( '@hapi/joi' );

        let parser;

        beforeEach( function() {

            parser = index.parser( joi );
        });

        it( 'string', function() {

            let schema = parser.parse( 'string: min=1, max=60, required' );

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'string' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 3 );

            expect( inspector.rule( 'min' ).args ).to.eql( { limit: 1 } );
            expect( inspector.rule( 'max' ).args ).to.eql( { limit: 60 } );
            expect( inspector.rule( 'trim' ).args ).to.eql( { enabled: true } );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'uuid', function() {

            let schema = parser.parse( 'uuid:required' );

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'string' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 2 );

            expect( inspector.rule( 'guid' ).regex ).to.exist;
            expect( inspector.rule( 'trim' ).args ).to.eql( { enabled: true } );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'email', function() {

            let schema = parser.parse( 'email:required' );

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'string' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 2 );

            expect( inspector.rule( 'email' ).regex ).to.exist;
            expect( inspector.rule( 'trim' ).args ).to.eql( { enabled: true } );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'number', function() {

            let schema = parser.parse( 'number:min=1,max=10,required' );

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'number' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 2 );

            expect( inspector.rule( 'min' ).args ).to.eql( { limit: 1 } );
            expect( inspector.rule( 'max' ).args ).to.eql( { limit: 10 } );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'boolean', function() {

            let schema = parser.parse( 'boolean:required' );

            expect( schema.type ).to.equal( 'boolean' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 0 );

            expect( schema._flags.presence ).to.equal( 'required' );
        });

        it( 'object', function() {

            let schema = parser.parse( {

                name: 'string:required',
                age: 'number'
            });

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'object' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 0 );

            expect( inspector.ids().size ).to.equal( 2 );

            const nameSchema = inspector.id( 'name' ).schema
            const nameInspector = new SchemaInspector( nameSchema );

            expect( nameSchema.type ).to.equal( 'string' );
            expect( nameInspector.rules().length ).to.equal( 1 );
            expect( nameInspector.rule( 'trim' ).args ).to.eql( { enabled: true } );
            expect( nameSchema._flags.presence ).to.equal( 'required' );

            const ageSchema = inspector.id( 'age' ).schema;
            const ageInspector = new SchemaInspector( ageSchema );
            expect( ageSchema.type ).to.equal( 'number' );
            expect( ageInspector.rules().length ).to.equal( 0 );
        });

        it( 'array', function() {

            let schema = parser.parse( {

                '@items': 'string:required'
            });

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'array' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 1 );

            expect( inspector.rule( 'items' ) ).to.exist;

            const itemTerms = schema[ '$_terms' ].items;
            expect( itemTerms ).to.exist;
            expect( itemTerms.length ).to.equal( 1 );

            const itemSchema = itemTerms[0];

            const itemInspector = new SchemaInspector( itemSchema );

            expect( itemInspector.rules().length ).to.equal( 1 );
            expect( itemInspector.rule( 'trim' ).args ).to.eql( { enabled: true } );

            expect( itemSchema._flags.presence ).to.equal( 'required' );

        });

        it( 'alternatives []', function() {

            let schema = parser.parse( [ 'uuid:required', 'number:required' ] );

            expect( joi.isSchema( schema ) ).to.be.true;
            expect( schema.type ).to.equal( 'alternatives' );

            const inspector = new SchemaInspector( schema );

            expect( inspector.rules().length ).to.equal( 0 );

            const matchesTerms = schema[ '$_terms' ].matches;
            expect( matchesTerms ).to.exist;
            expect( matchesTerms.length ).to.equal( 2 );

            const uuidSchema = matchesTerms[0].schema;
            expect( uuidSchema ).to.exist;

            expect( uuidSchema.type ).to.equal( 'string' );

            const uuidInspector = new SchemaInspector( uuidSchema );

            expect( uuidInspector.rules().length ).to.equal( 2 );

            expect( uuidInspector.rule( 'guid' ).regex ).to.exist;
            expect( uuidInspector.rule( 'trim' ).args ).to.eql( { enabled: true } );
            expect( uuidSchema._flags.presence ).to.equal( 'required' );


            const numberSchema = matchesTerms[1].schema;
            expect( numberSchema ).to.exist;

            expect( numberSchema.type ).to.equal( 'number' );

            const numberInspector = new SchemaInspector( numberSchema );

            expect( numberInspector.rules().length ).to.equal( 0 );

            expect( numberSchema._flags.presence ).to.equal( 'required' );
        });
    });
});
