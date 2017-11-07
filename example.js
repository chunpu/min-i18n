var i18n = require('./i18n')
var assert = require('assert')

i18n.setLocale('en')

assert.deepEqual(i18n.locale, 'en')

var i18nResources = {
    en: {
        'cancel': 'cancel',
        'submit': 'submit'
    },
    zh_CN: {
    	'cancel': '取消',
    	'submit': '提交'
    }
}

i18n.setResources(i18nResources)

assert.deepEqual(i18n.t('cancel'), 'cancel')

assert.deepEqual(i18n.t('never defined'), 'never defined')

i18n.setLocale('cn')

assert.deepEqual(i18n.t('cancel'), '取消')

assert.deepEqual(i18n.t('never defined'), 'never defined')

console.log('all pass!')