'use strict';

const Joi = require( 'joi' );

//const builder = require( 'joi-json' ).builder();
const builder = require( '..' ).builder();

let jsonSchema = {

    firstName: 'string:min=1,max=60,required',

    lastName: 'string:min=1,max=60,required',

    address: {

        street: 'string:min=1,max=80,required',
        street2: 'string:min=1,max=80',
        city: 'string:min=1,max=40,required',
        state: 'string:min=1,max=40,required',
        postal: 'string:min=1,max=20,required',

        '@required': true   // needs the '@' to indicate that "required" is a property
    }
};

let schema = builder.build( jsonSchema );

let record = {

    firstName: '  John  ',  // note: extra spaces
    lastName: 'Doe',

    address: {

        street: '1 Yonge Stret',
        city: 'Toronto',
        state: 'Ontario',
        postal: 'M5E 2A3'
    }
}

let result1 = Joi.validate( record, schema );

if( result1.error ) {

    // should not get here
    throw result1.error;
}

console.log( 'record validated:' );
console.log( result1.value );
console.log( '----------------------' );

let badRecord = {

    firstName: 'John',
    // lastName: 'Doe',     // missing last name!

    address: {

        street: '1 Yonge Stret',
        city: 'Toronto',
        state: 'Ontario',
        postal: 'M5E 2A3'
    }
}

let result2 = Joi.validate( badRecord, schema );

if( result2.error === null ) {

    throw new Error( 'failed to validate' );
}

// lastName not present
console.log( 'error from validation:', result2.error.message );
