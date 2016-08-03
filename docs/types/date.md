# Type: `date`

The `date` type corresponds to the `Joi.date()` schema.

# String notation

The following example creates a `date` validator:

```js
{
    bday: 'date:format = YYYY/MM/DD, min=1-1-1900'
}
```

# Object notation

```js
{
    bday: {

        '@type': 'date',
        format: 'YY/MM/DD',
        min: '1-1-1900'
    }
}
```

## Additional properties

Most operations are available including:
- `min`
- `max`
- `required`
- `format`
- `iso`

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
