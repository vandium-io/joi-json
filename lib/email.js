'use strict';

const StringSchema = require( './string' );

class EmailSchema extends StringSchema {

    constructor() {

        super();
    }

    _createSchema( engine ) {

        let schema = super._createSchema( engine );

        return schema.email();
    }
}

module.exports = EmailSchema;
