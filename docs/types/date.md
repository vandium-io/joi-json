# date

The `date` type corresponds to the `Joi.date()` schema. The following example creates a `date` validator:

```js
{
    bday: 'date:format = YYYY/MM/DD, min=1-1-1900'
}
```

Most options for date processing are available including:
- `min`
- `max`
- `required`
- `format`
- `iso`

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
