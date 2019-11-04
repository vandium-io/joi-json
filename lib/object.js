const BaseSchema = require( './base' );

class ObjectSchema extends BaseSchema {

    constructor( parseSchema ) {

        super( 'object' );

        this.parseSchema = parseSchema;
    }

    parse( config, engine ) {

        // Note: Joi will clone objects on changes and thus we need to update the schema reference
        const state = { schema: engine.object(), engine };

        let keys = {};

        let parseSchemaFunc = this.parseSchema;

        for( let key in config ) {

            let value = config[ key ];

            if( key.startsWith( '@' ) ) {

                this.updateSchema( state, key.substr( 1 ), value );
            }
            else {

                // assume key
                keys[ key ] = parseSchemaFunc.call( null, value, engine );
            }
        }

        state.schema = state.schema.keys( keys );

        return state.schema;
    }
}

module.exports = ObjectSchema;
