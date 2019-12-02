const UUIDSchema = require( '../uuid' );

const { expect } = require( 'chai' );

const sinon = require( 'sinon' );

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
        });
    });
});
