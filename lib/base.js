'use strict';

const utils = require( './utils' );

class BaseSchema {

    constructor( engineFuncName ) {

        this.engineFuncName = engineFuncName;
    }

    parse( config, engine ) {

        // Note: Joi will clone objects on changes and thus we need to update the schema reference
        let state = { schema: this._createSchema( engine ), engine };

        for( let key in config ) {

            this.updateSchema( state, key, config[ key ] );
        }

        return state.schema;
    }

    updateSchema( state, key, value ) {

        if( utils.isFunction( state.schema[key] ) ) {

            if( value === null ) {

                state.schema = state.schema[ key ]();
            }
            else {

                state.schema = state.schema[ key ]( value );
            }

            return true;
        }
    }

    _createSchema( engine ) {

        return engine[ this.engineFuncName ]();
    }
}

module.exports = BaseSchema;
