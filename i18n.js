// locale command: `locale -a` `man locale`
// LANG=zh_CN.UTF-8
// https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9F%9F%E8%AE%BE%E7%BD%AE
// https://en.wikipedia.org/wiki/Language_localisation
// Most frequently, there is a primary sub-code that identifies the language (e.g., "en"), and an optional sub-code in capital letters that specifies the national variety (e.g., "GB" or "US"). The sub-codes are typically linked with a hyphen, though in some contexts it's necessary to substitute this with an underscore.[8]
var _ = require('min-util')

function I18n() {
    this.resources = {} // {'zh_CN': {key: value, key2, value2   }}
    var locales = []
    if ('object' == typeof navigator) {
        locales = navigator.languages || [navigator.language]
    }
    this.setLocales(locales)
}

var proto = I18n.prototype

proto.is = function(subLocale) {
    // 比如 is('tw')
    return _.includes(_.lower(this.locale), _.lower(subLocale))
}

proto.setResource = function(locale, resource) {
    this.resources[locale] = resource
}

proto.setResources = function(resources) {
    _.extend(this.resources, resources)
}

proto.setLocale = function(locale) {
    var me = this
    if (!locale) return
    me.locale = locale
    var matchedLocale = I18n.matchLocale(_.keys(me.resources), locale)
    me.resource = me.resources[matchedLocale] || {}
    return matchedLocale
}

proto.setLocales = function(locales) {
    // TODO 暂不支持 fallback
    this.locales = locales
    this.setLocale(_.first(locales))
}

proto.translate = function(key) {
    return this.resource[key] || key
}

proto.t = proto.translate

I18n.matchLocale = function(locales, locale) {
    locales = _.map(locales, function(item) {
        return {
            raw: item,
            score: I18n.getSimilar(item, locale)
        }
    }).sort(function(a, b) {
        // 升序
        return a.score - b.score
    })
    // 未来可以按得分排序匹配
    var matched = _.last(locales) || {}
    return matched.raw
}

I18n.getSimilar = function(localeA, localeB) {
    // 得分越高越接近
    var score = 0
    localeA = I18n.parseLocale(_.lower(localeA))
    localeB = I18n.parseLocale(_.lower(localeB))
    // 小心两个都是 undefined 的情况
    if (localeA.language && localeA.language == localeB.language) {
        score += 50
    }
    if (localeA.country && localeA.country == localeB.country) {
        score += 40
    }
    if (localeA.language && localeA.language == localeB.country) {
        score += 20
    }
    if (localeB.language && localeB.language == localeA.country) {
        score += 20
    }
    return score
}

I18n.parseLocale = function(locale) {
    // e.g. zh_CN en-US
    var arr = locale.split(/[^a-zA-Z]+/)
    var ret = {
        language: arr[0],
        country: arr[1]
    }
    return ret
}

var i18n = new I18n()

module.exports = exports = i18n
