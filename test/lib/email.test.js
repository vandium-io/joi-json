'use strict';

/*jshint expr: true*/

const EmailSchema = require( '../../lib/email' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

describe( 'lib/email', function() {

    describe( 'EmailSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let instance = new EmailSchema();

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

                    let emailSchema = { };

                    emailSchema.required = sinon.stub().returns( emailSchema );
                    emailSchema.trim = sinon.stub().returns( emailSchema );
                    emailSchema.email = sinon.stub().returns( emailSchema );

                    let engine = {

                        string: sinon.stub().returns( emailSchema )
                    };

                    let instance = new EmailSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( emailSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.email.calledOnce ).to.be.true;
                    expect( emailSchema.email.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.required.calledOnce ).to.be.true;
                    expect( emailSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.trim.calledOnce ).to.be.true;
                    expect( emailSchema.trim.withArgs().calledOnce ).to.be.true;
                });
            });

            [
                [ 'normal operation, with trim=false', { required: null, trim: false } ],
                [ 'normal operation, with trim=no', { required: null, trim: 'no' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let emailSchema = { };

                    emailSchema.required = sinon.stub().returns( emailSchema );
                    emailSchema.trim = sinon.stub().returns( emailSchema );
                    emailSchema.email = sinon.stub().returns( emailSchema );

                    let engine = {

                        string: sinon.stub().returns( emailSchema )
                    };

                    let instance = new EmailSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( emailSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.email.calledOnce ).to.be.true;
                    expect( emailSchema.email.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.required.calledOnce ).to.be.true;
                    expect( emailSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( emailSchema.trim.called ).to.be.false;
                });
            });
        });
    });
});
