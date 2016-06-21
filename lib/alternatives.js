'use strict';

const utils = require( './utils' );

const BaseSchema = require( './base' );

class AlternativesSchema extends BaseSchema {

    constructor( parseSchema ) {

        super( 'alternatives' );

        this.parseSchema = parseSchema;
    }

    updateSchema( state, key, value ) {

        if( key === 'try' ) {

            if( !utils.isArray( value ) ) {

                // convert to array
                value = [ value ];
            }

            let schemas = [];

            let parseSchemaFunc = this.parseSchema;

            for( let item of value ) {

                let itemSchema = parseSchemaFunc.call( null, item, state.engine );

                schemas.push( itemSchema );
            }

            state.schema = state.schema.try.apply( state.schema, schemas );
            return true;
        }

        return super.updateSchema( state, key, value );
    }
}

module.exports = AlternativesSchema;
