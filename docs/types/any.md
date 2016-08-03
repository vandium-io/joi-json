# Type: `any`

The `any` type corresponds to the `Joi.any()` schema and can represent any type of value. Validation on this type is minimal.


## String notation

The following example creates an `any` validator for the `name` object value:

```js
{
    name: 'any:required',
    age: 'any'
}
```

## Object notation

```js
{
    name: {

        '@type': 'any',
        required: true
    },

    age: {

        '@type': 'any',
    }
}
```


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
