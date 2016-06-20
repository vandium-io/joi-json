'use strict';

const utils = require( './utils' );

const parser = require( './parser' );

class SchemaBuilder {

    constructor( engine ) {

        this.engine = engine;
    }

    build( config ) {

        if( utils.isString( config ) || config[ '@schema' ] ) {

            return parser.parseSchema( config, this.engine );
        }
        else {

            let schema = {};

            for( let key in config ) {

                let value = config[ key ];

                schema[ key ] = parser.parseSchema( value, this.engine );
            }

            return schema;
        }
    }
}

function builder( engine ) {

    return new SchemaBuilder( engine );
}

module.exports = {

    builder
};
