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
        };
    }

    convert( key, value ) {

        let converterFunc = this.converterMap[ key ];

        if( !converterFunc ) {

            return value;
        }

        return converterFunc( value );
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

    return converter.convert( key, value );
}

module.exports = convert;
