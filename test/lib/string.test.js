'use strict';

/*jshint expr: true*/

const StringSchema = require( '../../lib/string' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/string', function() {

    describe( 'StringSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let instance = new StringSchema();

                expect( instance.engineFuncName ).to.equal( 'string' );
            });
        });

        describe( '.parse', function() {

            [
                [ 'normal operation, with automatic trim', { required: null } ],
                [ 'normal operation, with trim', { required: null, trim: null } ],
                [ 'normal operation, with trim=true', { required: null, trim: true } ],
                [ 'normal operation, with trim=yes', { required: null, trim: 'yes' } ],
            ].forEach( function( test ) {

                it( test[0], function() {

                    let stringSchema = { };

                    stringSchema.required = sinon.stub().returns( stringSchema );
                    stringSchema.trim = sinon.stub().returns( stringSchema );

                    let engine = {

                        string: sinon.stub().returns( stringSchema )
                    };

                    let instance = new StringSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( stringSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.required.calledOnce ).to.be.true;
                    expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.trim.calledOnce ).to.be.true;
                    expect( stringSchema.trim.withArgs().calledOnce ).to.be.true;
                });
            });

            [
                [ 'normal operation, with trim=false', { required: null, trim: false } ],
                [ 'normal operation, with trim=no', { required: null, trim: 'no' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let stringSchema = { };

                    stringSchema.required = sinon.stub().returns( stringSchema );
                    stringSchema.trim = sinon.stub().returns( stringSchema );

                    let engine = {

                        string: sinon.stub().returns( stringSchema )
                    };

                    let instance = new StringSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( stringSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.required.calledOnce ).to.be.true;
                    expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.trim.called ).to.be.false;
                });
            });

            [
                [ 'normal operation, with regex string', { required: null, trim: false, regex: '^[a-z0-9]+$' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let stringSchema = { };

                    stringSchema.required = sinon.stub().returns( stringSchema );
                    stringSchema.regex = sinon.stub().returns( stringSchema );

                    let engine = {

                        string: sinon.stub().returns( stringSchema )
                    };

                    let instance = new StringSchema();

                    let config = test[1];

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( stringSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.required.calledOnce ).to.be.true;
                    expect( stringSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( stringSchema.regex.called ).to.be.true;
                    expect( stringSchema.regex.withArgs(new RegExp(test[1].regex)).calledOnce ).to.be.true;
                });
            });
        });
    });
});
