# String notation

The "string" notation format uses a single string to encapsulate the type and properties for a validation schema. The following is a
[ABNF](https://en.wikipedia.org/wiki/Augmented_Backus%E2%80%93Naur_Form) representation of the notation:

```
schema = type [ type-separator properties ]

type = "any" / "binary" / "boolean" / "date" / "email" / "number" / "string" / "uuid"

type-separator = ":"

properties = WSP property *( WSP property-separator WSP property )

property = property-name [ property-assignment property-value ]

property-name = 1*VCHAR

property-assignment = "="

property-value = 1*VCHAR

property-separator = ","
```

## Examples

```js

// string
//   min length = 1
//   max length = 100
//   required = true
"string:min=1,max=100,required"

// string (any length, not required)
"string"

// number
//   must be positive
//   required = true
"number: positive, required"

// uuid (not required)
"uuid"
```
