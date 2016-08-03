# email

The `email` type is short cut type that automatically configures the `string` type to accept email. This type maps to the `Joi.string().email()` schema.

```js
{
    name: 'string:min=1,max=100,required',
    email: 'email:required'
}
```

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
