'use strict';

/*jshint expr: true*/

const BaseSchema = require( '../../lib/base' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/base', function() {

    describe( 'BaseSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let instance = new BaseSchema( 'any' );

                expect( instance.engineFuncName ).to.equal( 'any' );
            });
        });

        describe( '.parse', function() {

            it( 'normal operation', function() {

                let specialSchema = { };

                specialSchema.noParam = sinon.stub().returns( specialSchema );
                specialSchema.withParam = sinon.stub().returns( specialSchema );

                let engine = {

                    special: sinon.stub().returns( specialSchema )
                };

                let instance = new BaseSchema( 'special' );

                let config = {

                    noParam: null,
                    withParam: 'param!'
                };

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( specialSchema );

                expect( engine.special.calledOnce ).to.be.true;
                expect( engine.special.withArgs().calledOnce ).to.be.true;

                expect( specialSchema.noParam.calledOnce ).to.be.true;
                expect( specialSchema.noParam.withArgs().calledOnce ).to.be.true;

                expect( specialSchema.withParam.calledOnce ).to.be.true;
                expect( specialSchema.withParam.withArgs( 'param!' ).calledOnce ).to.be.true;
            });

            it( 'unknown method', function() {

                let specialSchema = { };

                let engine = {

                    special: sinon.stub().returns( specialSchema )
                };

                let instance = new BaseSchema( 'special' );

                let config = {

                    special: true
                };

                let schema = instance.parse( config, engine );

                expect( schema ).to.equal( specialSchema );

                expect( engine.special.calledOnce ).to.be.true;
                expect( engine.special.withArgs().calledOnce ).to.be.true;
            });
        });
    });
});
