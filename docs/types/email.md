# Type: `email`

The `email` type is short cut type that automatically configures the `string` type to accept email. This type maps to the `Joi.string().email()` schema.

## String notation

```js
{
    emailAddress: 'email:required'
}
```

## Object notation

```js
{
    emailAddress: {

        '@type': 'email',
        required: true
    }
}
```


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
