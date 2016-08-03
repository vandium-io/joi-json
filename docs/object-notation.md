# Object notation

The "object" notation allows the schema to be expressed in detail using an object. The following details the format for object notation:

```js

{
    '@type': object_type

    // properties here
}
```

The `@type` property is used to determine the type of the object and should not interfere with other operations where object schemas are
being defined. The `object_type` value represents one of the types supported by Joi-JSON.
