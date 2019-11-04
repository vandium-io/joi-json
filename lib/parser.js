'use strict';

const { isString } = require( './utils' );

const convert = require( './convert' );

const BaseSchema = require( './base' );

const StringSchema = require( './string' );

const EmailSchema = require( './email' );

const UUIDSchema = require( './uuid' );

const ObjectSchema = require( './object' );

const ArraySchema = require( './array' );

const AlternativesSchema = require( './alternatives' );

const types = {

    any: new BaseSchema( 'any' ),

    string: new StringSchema( 'string' ),

    number: new BaseSchema( 'number' ),

    boolean: new BaseSchema( 'boolean' ),

    date: new BaseSchema( 'date' ),

    binary: new BaseSchema( 'binary' ),

    email: new EmailSchema(),

    uuid: new UUIDSchema(),

    object: new ObjectSchema( parseSchema ),

    array: new ArraySchema( parseSchema ),

    alternatives: new AlternativesSchema( parseSchema )
}

function parseSchemaString( str ) {

    const typeParts = str.split( ':', 2 );

    const [ type ] = typeParts;

    let schema = {

        '@type': type
    };

    if( typeParts.length > 1 ) {

        for( let valuePart of typeParts[1].split( ',' ) ) {

            const parts = valuePart.split( '=', 2 );

            const key = parts[0].trim();

            let value = parts[1];

            if( value ) {

                value = value.trim();
            }
            else {

                value = null;
            }

            value = convert( type, key, value );

            schema[ key ] = value;
        }
    }

    return schema;
}

function parseSchema( value, engine ) {

    if( isString( value ) ) {

        value = parseSchemaString( value );
    }

    let type = value[ '@type' ];

    if( !type ) {

        if( Array.isArray( value ) ) {

            // allow short form
            type = 'alternatives';
            value = { try: value };
        }
        else {

            if( value[ '@items' ] || value[ '@ordered' ] ) {

                type = 'array';
            }
            else {

                type = 'object';
            }
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

class Parser {

    constructor( engine ) {

        if( !engine ) {

            throw new Error( 'missing engine')
        }

        this.engine = engine;
    }

    parse( value ) {

        return parseSchema( value, this.engine );
    }

    static buildSchema( schemaConfig, engine ) {

        let schema = {};

        let parser = new Parser( engine );

        for( let key in schemaConfig ) {

            let value = schemaConfig[ key ];

            schema[ key ] = parser.parse( value );
        }

        return schema;
    }
}

module.exports = Parser;
