# Type: `object`

The `object` type corresponds to the `Joi.object()` schema.

## String notation

The following example creates an object validator:

```js
{
    address: {

        street: 'string:min=1,max=80,required',
        street2: 'string:min=1,max=80',
        city: 'string:min=1,max=40,required',
        state: 'string:min=1,max=40,required',
        postal: 'string:min=1,max=20,required'

        '@required': true   // needs the '@' to indicate that "required" is a property
    }
}
```

## Object notation

```js
{
    address: {

        '@type': 'object',

        street: {

            '@type': 'string',
            min: 1,
            max: 80,
            required: true
        },

        street2: {

            '@type': 'string',
            min: 1,
            max: 80
        },

        city: {

            '@type': 'string',
            min: 1,
            max: 40,
            required: true
        },

        state: {

            '@type': 'string',
            min: 1,
            max: 40,
            required: true
        },

        postal: {

            '@type': 'string',
            min: 1,
            max: 20,
            required: true
        }

        '@required': true   // needs the '@' to indicate that "required" is a property
    }
}
```

## Note on `object` properties

Please note that all object propertes should be prefixed with the `@` symbol. For example, `@required: true` indicates that the object is
required. The `@` symbol is used so that Joi-JSON knows that we're not defining a new property called "required", but asking it to mark the
object as being required.


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
