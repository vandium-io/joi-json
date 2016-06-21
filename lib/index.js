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

function resolveEngines() {

    for( let name of arguments ) {

        try {

            return require( name );
        }
        catch( err ) {

            // engine not found
        }
    }
}

function builder( engine ) {

    if( !engine ) {

        engine = resolveEngines( 'joi', 'lov' );

        if( !engine ) {

            throw new Error( 'cannot find validation engine' );
        }
    }

    return new SchemaBuilder( engine );
}

module.exports = {

    builder
};
