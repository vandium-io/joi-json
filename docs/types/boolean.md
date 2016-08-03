# Type: `boolean`

The `boolean` type corresponds to the `Joi.boolean()` schema.

# String notation

The following example creates some `boolean` validators:

```js
{
    opt_in: 'boolean'
    accept: 'boolean:required'
}
```

# Object notation

```js
{
    opt_in: {

        '@type': 'boolean'
    },

    accept: {

        '@type': 'boolean',
        required: true
    }
}
```

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
