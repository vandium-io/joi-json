'use strict';

const utils = require( './utils' );

function numberConverter( value ) {

    return Number.parseInt( value );
}

function booleanCoverter( value ) {

    if( value === undefined ) {

        return true;
    }

    return utils.parseBoolean( value );
}

function allowConverter( value, type ) {

    if( value === 'null' ) {

        return null;
    }

    if( type === 'number' ) {

        return numberConverter( value );
    }

    if( type === 'boolean' ) {

        return booleanCoverter( value );
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

        let converterFunc = this.converterMap[ key ];

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

    let converter = converters[ type ];

    if( !converter ) {

        converter = converters._default;
    }

    return converter.convert( key, value, type );
}

module.exports = convert;
