const BaseSchema = require( './base' );

class ArraySchema extends BaseSchema {

    constructor( parseSchema ) {

        super( 'array' );

        this.parseSchema = parseSchema;
    }

    updateSchema( state, key, value ) {

        if( key[0] === '@' ) {

            key = key.substr(1);
        }

        if( key === 'items' || key === 'ordered' ) {

            if( !Array.isArray( value ) ) {

                // convert to array
                value = [ value ];
            }

            let schemas = [];

            let parseSchemaFunc = this.parseSchema;

            for( let item of value ) {

                let itemSchema = parseSchemaFunc.call( null, item, state.engine );

                schemas.push( itemSchema );
            }

            state.schema = state.schema[ key ].apply( state.schema, schemas );
            return true;
        }

        return super.updateSchema( state, key, value );
    }
}

module.exports = ArraySchema;
