# binary

The `binary` type corresponds to the `Joi.binary()` schema. The following example creates a `binary` validator:

```js
{
    public_key: 'binary:encoding=base64,required'
}
```

Most options for date processing are available including:
- `min`
- `max`
- `required`
- `encoding`

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
