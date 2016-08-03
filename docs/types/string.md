# string

The `string` type corresponds to the `Joi.string()` schema. The following example creates some `string` validators:

```js
{
    name: 'string:min=1,max=100,required'
    card: 'string:creditCard',
    computer: 'string:hostname'
}
```

Most options for string processing are available including:
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

Strings are automatically trimmed. To disable this functionality, add the `trim=false` property to your schema as in the following example:

```js
{
    name: 'string: min=1, max=100, trim=false, required'
}
```


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
