'use strict';

/*jshint expr: true*/

const ArraySchema = require( '../../lib/array' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/array', function() {

    describe( 'ArraySchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let parseSchema = sinon.stub();

                let instance = new ArraySchema( parseSchema );

                expect( instance.engineFuncName ).to.equal( 'array' );
                expect( instance.parseSchema ).to.equal( parseSchema );
            });
        });

        describe( '.parse', function() {

            let engineSchema = { };

            let engine;

            let parseSchema;

            let instance;

            beforeEach( function() {

                engineSchema = { };

                engineSchema.required = sinon.stub().returns( engineSchema );

                engine = {

                    array: sinon.stub().returns( engineSchema )
                };

                parseSchema = sinon.stub();

                instance = new ArraySchema( parseSchema );
            });

            it( 'using items(), single item', function() {

                engineSchema.items = sinon.stub().returns( engineSchema );

                let config = {

                    'required': true,

                    '@items': 'string:min=1,max=200,required'
                };

                let nameSchema = {};

                parseSchema.returns( nameSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.items.calledOnce ).to.be.true;
                expect( engineSchema.items.withArgs( nameSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });

            it( 'using items(), multiple items', function() {

                engineSchema.items = sinon.stub().returns( engineSchema );

                let config = {

                    'required': true,

                    '@items': [ 'string:min=1,max=200,required', 'boolean:required' ]
                };

                let nameSchema = { type: 'name' };
                let booleanSchema = { type: 'bool' };

                parseSchema.onFirstCall().returns( nameSchema );
                parseSchema.onSecondCall().returns( booleanSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.items.calledOnce ).to.be.true;
                expect( engineSchema.items.withArgs( nameSchema, booleanSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });

            it( 'using ordered(), single item', function() {

                engineSchema.ordered = sinon.stub().returns( engineSchema );

                let config = {

                    'required': true,

                    '@ordered': 'string:min=1,max=200,required'
                };

                let nameSchema = {};

                parseSchema.returns( nameSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.ordered.calledOnce ).to.be.true;
                expect( engineSchema.ordered.withArgs( nameSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });

            it( 'using ordered(), multiple items', function() {

                engineSchema.ordered = sinon.stub().returns( engineSchema );

                let config = {

                    'required': true,

                    '@ordered': [ 'string:min=1,max=200,required', 'boolean:required' ]
                };

                let nameSchema = { type: 'name' };
                let booleanSchema = { type: 'bool' };

                parseSchema.onFirstCall().returns( nameSchema );
                parseSchema.onSecondCall().returns( booleanSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.ordered.calledOnce ).to.be.true;
                expect( engineSchema.ordered.withArgs( nameSchema, booleanSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });
        });
    });
});
