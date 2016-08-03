# object

The `object` type corresponds to the `Joi.object()` schema. The following example creates an object validator:

```js
{
    name: 'string:min=1,max=100,required'

    address: {

        street: 'string:min=1,max=80,required',
        street2: 'string:min=1,max=80',
        city: 'string:min=1,max=40,required',
        state: 'string:min=1,max=40,required',
        postal: 'string:min=1,max=20,required'

        '@required': true   // needs the '@' to indicate that "required" is a property
    }
}
```

Note that the `@required: true` indicates that the object is required. The `@` symbol is used so that Joi-JSON knows that we're not defining a new
property called "required", but asking it to mark the object as being required.


For more information on this type, see the [Joi documentation](https://github.com/hapijs/joi/blob/v8/API.md).
