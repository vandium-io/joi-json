# Type: `alternatives`

The alternatives type maps to the `Joi.alternatives()` and `Joi.try()` schemas.

## String notation
Alternatives are represented using square brackets (`[]`). The following example demonstrates how to use alternatives to select between one or more types:

```js
{
    nameOrId: [ 'string:min=1,max=100', 'uuid' ]
}
```

## Object notation

```js
{
    nameOrId: {

        '@type': 'alternatives',
        try: [ {

            '@type': 'string',
            min: 1,
            max: 100
        },
        {
            '@type': 'uuid'
        }]
    }
}
```

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
