const { parseBoolean } = require( './utils' );

function numberConverter( value ) {

    return Number.parseInt( value );
}

function booleanCoverter( value ) {

    if( value === undefined ) {

        return true;
    }

    return parseBoolean( value );
}

function allowConverter( value, type ) {

    if( value === 'null' ) {

        value = null;
    }
    else if( type === 'number' ) {

        value = numberConverter( value );
    }
    else if( type === 'boolean' ) {

        value = booleanCoverter( value );
    }

    return value;
}

class Converter {

    constructor() {

        this.converterMap = {

            min: numberConverter,
            max: numberConverter,
            length: numberConverter,
            greater: numberConverter,
            less: numberConverter,
            precision: numberConverter,
            multiple: numberConverter,

            sparse: booleanCoverter,
            single: booleanCoverter,
            truncate: booleanCoverter,
            isRaw: booleanCoverter,

            allow: allowConverter,
        };
    }

    convert( key, value, type ) {

        const converterFunc = this.converterMap[ key ];

        if( !converterFunc ) {

            return value;
        }

        return converterFunc( value, type );
    }
}

const converters = {

    _default: new Converter()
};


function convert( type, key, value ) {

    const converter = converters[ type ] || converters._default;

    return converter.convert( key, value, type );
}

module.exports = convert;
