const BaseSchema = require( './base' );

class AlternativesSchema extends BaseSchema {

    constructor( parseSchema ) {

        super( 'alternatives' );

        this.parseSchema = parseSchema;
    }

    updateSchema( state, key, value ) {

        if( key === 'try' ) {

            if( !Array.isArray( value ) ) {

                // convert to array
                value = [ value ];
            }

            const schemas = value.map( (item) =>  this.parseSchema.call( null, item, state.engine ));

            state.schema = state.schema.try.apply( state.schema, schemas );
            return true;
        }

        return super.updateSchema( state, key, value );
    }
}

module.exports = AlternativesSchema;
