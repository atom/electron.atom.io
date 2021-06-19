const DIST_URL = 'https://electronjs-artifacts.s3.amazonaws.com/dist'

module.exports = (req, res, next) => {
  const url = req.params[0]
  if (url === []) return next()
  return res.redirect(`${DIST_URL}/${url}`)
}
