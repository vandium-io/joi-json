'use strict';

/*jshint expr: true*/

const AlternativesSchema = require( '../../lib/alternatives' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/alternatives', function() {

    describe( 'AlternativesSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let parseSchema = sinon.stub();

                let instance = new AlternativesSchema( parseSchema );

                expect( instance.engineFuncName ).to.equal( 'alternatives' );
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
                engineSchema.try = sinon.stub().returns( engineSchema );

                engine = {

                    alternatives: sinon.stub().returns( engineSchema )
                };

                parseSchema = sinon.stub();

                instance = new AlternativesSchema( parseSchema );
            });

            it( 'using try(), single item', function() {


                let config = {

                    'required': true,

                    try: 'string:min=1,max=200,required'
                };

                let nameSchema = {};

                parseSchema.returns( nameSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.try.calledOnce ).to.be.true;
                expect( engineSchema.try.withArgs( nameSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });

            it( 'using try(), multiple items', function() {

                let config = {

                    'required': true,

                    try: [ 'string:min=1,max=200,required', 'boolean:required' ]
                };

                let nameSchema = { type: 'name' };
                let booleanSchema = { type: 'bool' };

                parseSchema.onFirstCall().returns( nameSchema );
                parseSchema.onSecondCall().returns( booleanSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.try.calledOnce ).to.be.true;
                expect( engineSchema.try.withArgs( nameSchema, booleanSchema ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });
        });
    });
});
