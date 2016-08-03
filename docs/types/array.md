# object

The `array` type corresponds to the `Joi.array()` schema. For the object to be recognized as an array, the `@items` property must be present.

The following example creates an array validator with a list of credit card numbers:

```js
{
    credit_cards: {

        '@items': 'string:creditCard',

        max: 5
    }
}
```

For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
