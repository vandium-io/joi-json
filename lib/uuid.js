'use strict';

const utils = require( './utils' );

const StringSchema = require( './string' );

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

class UUIDSchema extends StringSchema {

    constructor() {

        super();
    }

    _createSchema( engine ) {

        let schema = super._createSchema( engine );

        if( utils.isFunction( schema.uuid ) ) {

            return schema.uuid();
        }
        else if( utils.isFunction( schema.guid ) ) {

            return schema.guid();
        }
        else {

            // old school
            return schema.regex( UUID_REGEX, 'UUID' );
        }
    }
}

module.exports = UUIDSchema;
