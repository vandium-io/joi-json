# Type: `string`

The `string` type corresponds to the `Joi.string()` schema.

## String notation

```js
{
    name: 'string:min=1,max=100,required'
    card: 'string:creditCard',
    computer: 'string:hostname'
}
```

## Object notation

```js
{
    name: {

        '@type': 'string',
        min: 1,
        max: 100,
        required: true
    },

    card: {

        '@type': 'string',
        creditCard: true
    },

    computer: {

        '@type': 'string',
        hostname: true
    }
}
```

## Additional properties

Most operations for string processing are available including:

- `min`
- `max`
- `required`
- `insensitive`
- `creditCard`
- `regex`
- `alphanum`
- `hex`
- `hostname`
- `lowercase`
- `uppercase`
- `token`


## Automatic string trimming

Strings are automatically trimmed. To disable this functionality, add the `trim=false` property to your schema as in the following example:

```js
{
    name: 'string: min=1, max=100, trim=false, required'
}
```


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
