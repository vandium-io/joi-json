'use strict';

const utils = require( './utils' );

const convert = require( './convert' );

const BaseSchema = require( './base' );

const ObjectSchema = require( './object' );

const ArraySchema = require( './array' );

const AlternativesSchema = require( './alternatives' );

const types = {

    any: new BaseSchema( 'any' ),
    string: new BaseSchema( 'string' ),
    number: new BaseSchema( 'number' ),
    boolean: new BaseSchema( 'boolean' ),
    date: new BaseSchema( 'date' ),
    binary: new BaseSchema( 'binary' ),

    object: new ObjectSchema( parseSchema ),
    array: new ArraySchema( parseSchema ),
    alternatives: new AlternativesSchema( parseSchema )
}

function parseSchemaString( str ) {

    let typeParts = str.split( ':', 2 );

    let type = typeParts[0];

    let schema = {

        type
    };

    if( typeParts.length > 1 ) {

        for( let valuePart of typeParts[1].split( ',' ) ) {

            let parts = valuePart.split( '=', 2 );

            let key = parts[0];

            let value = parts[1];

            if( value ) {

                value = value.trim();
            }

            value = convert( type, key, value );

            schema[ key ] = value;
        }
    }

    return schema;
}

function parseSchema( value, engine ) {

    if( utils.isString( value ) ) {

        value = parseSchemaString( value );
    }

    let type = value.type;

    if( !type ) {

        if( Array.isArray( value ) ) {

            // allow short form
            type = 'alternatives';
            value = { try: value };
        }
        else {

            type = 'object';
        }
    }
    else {

        // don't need this any more
        delete value.type;
    }

    let parser = types[ type ];

    if( !parser ) {

        throw new Error( 'unknown type: ' + type );
    }


    return parser.parse( value, engine );
}

function buildSchema( schemaConfig, engine ) {

    let schema = {};

    for( let key in schemaConfig ) {

        let value = schemaConfig[ key ];

        schema[ key ] = parseSchema( value, engine );
    }

    return schema;
}

module.exports = {

    buildSchema,

    parseSchema,
};
