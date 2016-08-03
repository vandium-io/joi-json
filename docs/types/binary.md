# Type: `binary`

The `binary` type corresponds to the `Joi.binary()` schema.

# String notation

The following example creates a `binary` validator:

```js
{
    public_key: 'binary:encoding=base64,required'
}
```

# Object notation

``` js
{
    public_key: {

        '@type': 'binary',
        encoding: 'base64',
        required: true
    }
}
```

## Additional properties
Most operations are available including:
- `min`
- `max`
- `required`
- `encoding`

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
