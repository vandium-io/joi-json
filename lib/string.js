const { parseBoolean } = require( './utils' );

const BaseSchema = require( './base' );

class StringSchema extends BaseSchema {

    constructor() {

        super( 'string' );
    }

    parse( config, engine ) {

        if( config.trim === null ) {

            config.trim = true;
        }

        let schema = super.parse( config, engine );

        if( config.trim === undefined ) {

            // auto-trim string
            schema = schema.trim();
        }

        return schema;
    }

    updateSchema( state, key, value ) {

        // don't trim if schema is set to false - Joi does have a way to turn off trim()
        if( key === 'trim' && (parseBoolean( value ) === false) ) {

            return;
        }

        if( key === 'regex' && !( value instanceof RegExp ) ) {
            value = new RegExp(value);
        }

        return super.updateSchema( state, key, value );
    }
}

module.exports = StringSchema;
