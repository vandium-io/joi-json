const { isFunction } = require( './utils' );

const StringSchema = require( './string' );

class UUIDSchema extends StringSchema {

    constructor() {

        super();
    }

    _createSchema( engine ) {

        return super._createSchema( engine ).uuid();
    }
}

module.exports = UUIDSchema;
