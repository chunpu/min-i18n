min-i18n
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/min-i18n.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-i18n
[downloads-image]: http://img.shields.io/npm/dm/min-i18n.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-i18n
[david-image]: http://img.shields.io/david/chunpu/min-i18n.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/min-i18n


simple javascript i18n lib

Installation
---

```sh
npm i min-i18n
```

## Api

- `i18n.t(string)` translate string, if no match will return it self
- `i18n.locale` return locale guessed by `navigator.languages`
- `i18n.sertLocale(locale)` manual set locale
- `i18n.is(locale)` is the locate, return boolean
- `i18n.setResource(locale, resource)` set one locale resource
- `i18n.setResources(resources)` set multiply locale resources
License
---

[![License][license-image]][license-url]

[license-image]: http://img.shields.io/npm/l/min-i18n.svg?style=flat-square
[license-url]: #
