const StringSchema = require( './string' );

class EmailSchema extends StringSchema {

    constructor() {

        super();
    }

    _createSchema( engine ) {

        const schema = super._createSchema( engine );

        return schema.email();
    }
}

module.exports = EmailSchema;
