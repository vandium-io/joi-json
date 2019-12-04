# Change Log

## 4.0.0 (2019-12-04)

Breaking:

* Support current version of Joi under `@hapi` organization. This version
will no longer support the previous `joi` package. Be sure to include a dependency
of `@hapi/joi` in your project dependencies.

## 3.0.0 (2019-11-04)

Updated:

* Support for `allow`. Thanks @fabiogomessilva
* Removed support for `lov`

Internal:

* Code coverage now uses `nyc`
* Updated dependencies
* Refactored tests
* Tests now build with node 10.x and use Joi 14.0.0


## 2.1.0 (2018-09-26)

Updated:

* Removed support for `lov`
* Support for `allow`. Thanks @fabiogomessilva

Changed:

* Tests now build with node 10.x and use Joi 14.0.0

Internal:

* Code coverage now uses `nyc`
* Updated test packages


## 2.0.1 (2016-08-03)

Added:

* `uuid`, `guid`, and `email` types

Changed:

* `string` instances have `trim` property set by default
* `type` property changed to `@type`


## 1.1.0 (2016-07-26)

Added:

* `Parser` for parsing individual strings to bypass the builder

Updated:

* `vandium-utils` dependency to 1.1.0

## 1.0.1 (2016-07-25)

Fixed:

* Typos

## 1.0.0 (2016-06-22)

Initial release
