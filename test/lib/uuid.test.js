'use strict';

/*jshint expr: true*/

const UUIDSchema = require( '../../lib/uuid' );

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const CONTROL_UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

describe( 'lib/uuid', function() {

    describe( 'uuidSchema', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let instance = new UUIDSchema();

                expect( instance.engineFuncName ).to.equal( 'string' );
            });
        });

        describe( '.parse', function() {

            [
                [ 'normal operation, uuid supported, with automatic trim', { required: null } ],
                [ 'normal operation, uuid supported, with trim', { required: null, trim: null } ],
                [ 'normal operation, uuid supported, with trim=true', { required: null, trim: true } ],
                [ 'normal operation, uuid supported, with trim=yes', { required: null, trim: 'yes' } ],
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.uuid = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.uuid.calledOnce ).to.be.true;
                    expect( uuidSchema.uuid.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.calledOnce ).to.be.true;
                    expect( uuidSchema.trim.withArgs().calledOnce ).to.be.true;
                });
            });

            [
                [ 'normal operation, uuid supported, with trim=false', { required: null, trim: false } ],
                [ 'normal operation, uuid supported, with trim=no', { required: null, trim: 'no' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.uuid = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.uuid.calledOnce ).to.be.true;
                    expect( uuidSchema.uuid.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.called ).to.be.false;
                });
            });

            [
                [ 'normal operation, guid supported, with automatic trim', { required: null } ],
                [ 'normal operation, guid supported, with trim', { required: null, trim: null } ],
                [ 'normal operation, guid supported, with trim=true', { required: null, trim: true } ],
                [ 'normal operation, guid supported, with trim=yes', { required: null, trim: 'yes' } ],
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.guid = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.guid.calledOnce ).to.be.true;
                    expect( uuidSchema.guid.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.calledOnce ).to.be.true;
                    expect( uuidSchema.trim.withArgs().calledOnce ).to.be.true;
                });
            });



            [
                [ 'normal operation, uuid supported, with trim=false', { required: null, trim: false } ],
                [ 'normal operation, uuid supported, with trim=no', { required: null, trim: 'no' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.uuid = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.uuid.calledOnce ).to.be.true;
                    expect( uuidSchema.uuid.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.called ).to.be.false;
                });
            });


            [
                [ 'normal operation, regex, with automatic trim', { required: null } ],
                [ 'normal operation, regex, with trim', { required: null, trim: null } ],
                [ 'normal operation, regex, with trim=true', { required: null, trim: true } ],
                [ 'normal operation, regex, with trim=yes', { required: null, trim: 'yes' } ],
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.regex = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.regex.calledOnce ).to.be.true;
                    expect( uuidSchema.regex.withArgs( CONTROL_UUID_REGEX ).calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.calledOnce ).to.be.true;
                    expect( uuidSchema.trim.withArgs().calledOnce ).to.be.true;
                });
            });

            [
                [ 'normal operation, regex, with trim=false', { required: null, trim: false } ],
                [ 'normal operation, regex, with trim=no', { required: null, trim: 'no' } ]
            ].forEach( function( test ) {

                it( test[0], function() {

                    let uuidSchema = { };

                    uuidSchema.required = sinon.stub().returns( uuidSchema );
                    uuidSchema.trim = sinon.stub().returns( uuidSchema );
                    uuidSchema.regex = sinon.stub().returns( uuidSchema );

                    let engine = {

                        string: sinon.stub().returns( uuidSchema )
                    };

                    let instance = new UUIDSchema();

                    let config = test[1]

                    let schema = instance.parse( config, engine );

                    expect( schema ).to.equal( uuidSchema );

                    expect( engine.string.calledOnce ).to.be.true;
                    expect( engine.string.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.regex.calledOnce ).to.be.true;
                    expect( uuidSchema.regex.withArgs( CONTROL_UUID_REGEX ).calledOnce ).to.be.true;

                    expect( uuidSchema.required.calledOnce ).to.be.true;
                    expect( uuidSchema.required.withArgs().calledOnce ).to.be.true;

                    expect( uuidSchema.trim.called ).to.be.false;
                });
            });
        });
    });
});
