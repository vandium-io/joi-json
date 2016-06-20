'use strict';

const builder = require( '../lib' ).builder( require( 'joi' ) );

// schema
let x = {

    firstName: 'string:min=1,max=100,required',

    lastName: {

        type: 'string',
        min: 1,
        max: 3,
        required: true
    },

    age: 'number:min=1,max=100,integer,required',

    happy: 'boolean',

    human: 'boolean:required',

    address: {

        street: 'string:min=1,max=200,required',
        street2: 'string:min=1,max=200',
        city: 'string:min=1,max=60,required',
        state: 'string:min=1,max=40,required',

        '@required': true
    },

    nested: {

        inner: {

            name: 'string',
            age: 'number',
            address: {

                street: 'string'
            },

            '@required': true
        }
    },

    birthday: 'date:required',

    friends: {

        type: 'array',
        items: [ 'string:min=1,max=10,required', { type: 'number', integer: true, positive: true } ],
        required: true
    },

    picture: 'binary:encoding=base64,min=0,max=1024,required'
};

let schema = builder.build( x );

console.log( JSON.stringify( schema, null, 2 ) );

//console.log( Joi.validate( { firstName: 'fred', lastName: 'smith', age: 200 }, schema ) );
