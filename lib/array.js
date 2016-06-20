'use strict';

const utils = require( './utils' );

const BaseSchema = require( './base' );

class ArraySchema extends BaseSchema {

    constructor( parseSchema ) {

        super( 'array' );

        this.parseSchema = parseSchema;
    }

    updateSchema( state, key, value ) {

        if( key === 'items' || key === 'ordered' ) {

            if( !utils.isArray( value ) ) {

                // convert to array
                value = [ value ];
            }

            let schemas = [];

            let parseSchemaFunc = this.parseSchema;

            for( let item of value ) {

                let itemSchema = parseSchemaFunc.call( null, item, state.engine );

                console.log( itemSchema );
                console.log( itemSchema.validate );
                console.log( utils.isFunction( itemSchema.validate ) );



                schemas.push( itemSchema );
            }

            console.log( schemas );
            state.schema = state.schema[ key ]( schemas );
            return true;
        }

        return super.updateSchema( state, key, value );
    }
}

module.exports = ArraySchema;
