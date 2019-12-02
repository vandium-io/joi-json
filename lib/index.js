const { isString } = require( './utils' );

const Parser = require( './parser' );

const engine = require( '@hapi/joi' );

class SchemaBuilder {

    constructor( parser ) {

        this.parser = parser;
    }

    build( config ) {

        if( isString( config ) || config[ '@schema' ] ) {

            return this.parser.parse( config );
        }
        else {

            let schema = {};

            for( let key in config ) {

                let value = config[ key ];

                schema[ key ] = this.parser.parse( value );
            }

            return schema;
        }
    }
}

function parser() {

    return new Parser( engine );
}

function builder() {

    return new SchemaBuilder( parser() );
}

module.exports = {

    builder,

    parser,
};
