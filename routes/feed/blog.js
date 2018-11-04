const { setupFeed } = require('./mainFeed')
const memoize = require('fast-memoize')

module.exports = function feedHandler (req, res, next) {
  const cachedSetupFeed = memoize(setupFeed)
  const feed = cachedSetupFeed('blog', req.context.posts)

  if (req.path === '/blog.xml') {
    res.set('content-type', 'text/xml')
    res.send(feed.atom1())
  } else if (req.path === '/blog.json') {
    res.set('content-type', 'application/json')
    res.json(JSON.parse(feed.json1()))
  } else {
    return next()
  }
}
