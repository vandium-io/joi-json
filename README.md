[![Build Status](https://travis-ci.org/vandium-io/joi-json.svg?branch=master)](https://travis-ci.org/vandium-io/joi-json)
[![npm version](https://badge.fury.io/js/joi-json.svg)](https://badge.fury.io/js/joi-json)

# Joi-JSON

Creates [Joi](https://github.com/hapijs/joi) based object schemas from JSON.

## Features

* Create Joi schemas from JSON data
* Express simple schemas using a single string
* Lightweight with minimal dependencies
* Compatible with most of the Joi API
* Node.js 10.x compatible for use in AWS Lambda environments
* Supports `@hapi/joi` implementation

## Installation

Install via npm.

	npm install joi-json --save


**Note**: `@hapi/joi` needs to be installed into your project

## Getting Started

```js
const builder = require( 'joi-json' ).builder();

let jsonSchema = {

    firstName: 'string:min=1,max=60,required',  // string using string-based notation

    lastName: { // string using object notation

        '@type': 'string',
        min: 1,
        max: 60,
        required: true
    },

    address: {  // address is an object (i.e. joi.object() )

        street: 'string:min=1,max=80,required',
        street2: 'string:min=1,max=80',
        city: 'string:min=1,max=40,required',
        state: 'string:min=1,max=40,required',
        postal: 'string:min=1,max=20,required',

        '@required': true   // needs the '@' to indicate that "required" is a property
    },

    // alternative values (i.e. joi.alternatives().try() )
    favNumberOrWord: [

        'string:min=1,max=10',
        'number:min=0,max=100'
    ]
};

let schema = builder.build( jsonSchema );
```

Which would yield the equivalent to the following `joi` schema:

```js

const joi = require( '@hapi/joi' );

let schema = {

    firstName: joi.string().min(1).max(60).trim().required(),

    lastName: joi.string().min(1).max(60).trim().required(),

    address: Object.keys( {

            street: joi.string().min(1).max(80).trim().required(),
            street2: joi.string().min(1).max(80).trim(),
            city: joi.string().min(1).max(40).trim().required(),
            state: joi.string().min(1).max(40).trim().required(),
            postal: joi.string().min(1).max(20).trim().required()

        }).required(),

    favNumberOrWord: [

            joi.string().min(1).max(10).trim(),
            joi.number().min(1).max(100)
        ]
};
```

## Documentation

For information on how to use Joi-JSON, please see our [API documentation](docs)


## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact us at `feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
