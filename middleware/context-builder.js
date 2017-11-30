const i18n = require('../lib/i18n')
const vendoredVersions = require('../data/versions.json')
  .find(version => version.version === i18n.electronLatestStableVersion)
const {getLanguageNativeName} = require('locale-code')

// Supply all route handlers with a baseline `req.context` object
module.exports = function contextBuilder (req, res, next) {
  // Attach i18n object to request so any route handler can use it if needed
  req.i18n = i18n

  const localized = i18n.website[req.language]

  // Page titles, descriptions, etc
  let page = Object.assign({
    title: `${localized._404.page_not_found} | Electron`,
    path: req.path
  }, i18n.website[req.language].pages[req.path])

  if (req.path !== '/') {
    page.title = `${page.title} | Electron`
  }

  req.context = {
    electronLatestStableVersion: i18n.electronLatestStableVersion,
    electronLatestStableTag: i18n.electronLatestStableTag,
    vendoredVersions: vendoredVersions,
    currentLocale: req.language,
    currentLocaleNativeName: getLanguageNativeName(req.language),
    locales: i18n.locales,
    page: page,
    localized: localized,
    cookies: req.cookies
  }

  if (req.path.startsWith('/docs')) {
    req.context.docs = i18n.docs[req.language]
  }

  return next()
}
