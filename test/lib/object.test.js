'use strict';

/*jshint expr: true*/

const ObjectSchema = require( '../../lib/object' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/object', function() {

    describe( 'ObjectSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let parseSchema = sinon.stub();

                let instance = new ObjectSchema( parseSchema );

                expect( instance.engineFuncName ).to.equal( 'object' );
                expect( instance.parseSchema ).to.equal( parseSchema );
            });
        });

        describe( '.parse', function() {

            it( 'normal operation', function() {

                let engineSchema = { };

                engineSchema.required = sinon.stub().returns( engineSchema );
                engineSchema.keys = sinon.stub().returns( engineSchema );

                let engine = {

                    object: sinon.stub().returns( engineSchema )
                };

                let parseSchema = sinon.stub();

                let instance = new ObjectSchema( parseSchema );

                let config = {

                    '@required': true,

                    name: 'string:min=1,max=200,required'
                };

                let nameSchema = {};

                parseSchema.returns( nameSchema );

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( engineSchema );

                expect( engineSchema )

                expect( engineSchema.keys.calledOnce ).to.be.true;
                expect( engineSchema.keys.withArgs( { name: nameSchema } ).calledOnce ).to.be.true;

                expect( engineSchema.required.calledOnce ).to.be.true;
                expect( engineSchema.required.withArgs( true ).calledOnce ).to.be.true;
            });
        });
    });
});
