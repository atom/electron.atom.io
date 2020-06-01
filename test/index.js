require('make-promises-safe')

const { describe, it, beforeEach, afterEach } = require('mocha')
const test = it
const supertest = require('supertest')
const session = require('supertest-session')
const nock = require('nock')
const cheerio = require('cheerio')
const chai = require('chai')
const i18n = require('../lib/i18n')
chai.should()
chai.use(require('chai-cheerio'))
const app = require('../server.js')

async function get (route) {
  const res = await supertest(app).get(route)
  const $ = cheerio.load(res.text)
  $.res = Object.assign({}, res)
  return $
}

describe('electronjs.org', () => {
  test('gzip enabled', async () => {
    const res = await supertest(app).get(`/`)
    res.headers['content-encoding'].should.equal('gzip')
  })

  describe('feeds', () => {
    test('blog feeds', async () => {
      let res = await supertest(app).get(`/blog.json`)
      res.headers['content-type'].should.equal('application/json; charset=utf-8')
      res.body.title.should.equal('Electron')
      res = await supertest(app).get(`/blog.xml`)
      res.headers['content-type'].should.equal('text/xml; charset=utf-8')
    })

    test('releases feeds', async () => {
      let res = await supertest(app).get(`/releases.json`)
      res.headers['content-type'].should.equal('application/json; charset=utf-8')
      res.body.title.should.equal('Electron')
      res = await supertest(app).get(`/releases.xml`)
      res.headers['content-type'].should.equal('text/xml; charset=utf-8')
    })
  })

  describe('stylesheets', () => {
    test('main stylesheet compiles', async () => {
      const res = await supertest(app).get('/styles/index.css')
      res.statusCode.should.eq(200)
    })
  })

  describe('homepage', () => {
    test('displays electron version data for latest and beta', async () => {
      const $ = await get('/')
      $('#electron-version-latest').text().should.match(/npm i -D electron@latest/)
      $('#electron-version-latest').text().should.match(/Electron\s+\d+\.\d+\.\d+/)
      $('#electron-version-latest').text().should.match(/Node\s+\d+\.\d+\.\d+/)
      $('#electron-version-latest').text().should.match(/Chromium\s+\d+\.\d+\.\d+\.\d+/)

      $('#electron-version-beta').text().should.match(/npm i -D electron@beta/)
      $('#electron-version-beta').text().should.match(/Electron\s+\d+\.\d+\.\d+/)
      $('#electron-version-beta').text().should.match(/Node\s+\d+\.\d+\.\d+/)
      $('#electron-version-beta').text().should.match(/Chromium\s+\d+\.\d+\.\d+\.\d+/)
    })

    test('displays featured apps', async () => {
      const $ = await get('/')
      $('header').should.have.class('site-header')
      $('p.jumbotron-lead').should.contain('Build cross-platform desktop apps')
      $('.featured-app-list-item').length.should.equal(5)
      $('head > title').text().should.match(/^Electron/)
    })

    test('displays Code of Conduct link in the footer', async () => {
      const $ = await get('/')
      $('a.footer-nav-item[href="https://github.com/electron/electron/tree/master/CODE_OF_CONDUCT.md"]')
        .text().should.eq('Code of Conduct')
    })

    test('displays Security link in the footer', async () => {
      const $ = await get('/')
      $('a.footer-nav-item[href="https://github.com/electron/electron/tree/master/SECURITY.md"]')
        .text().should.eq('Security')
    })

    test('displays License link in the footer', async () => {
      const $ = await get('/')
      $('a.footer-nav-item[href="https://github.com/electron/electron/tree/master/LICENSE"]')
        .text().should.eq('License')
    })
  })

  describe('apps', () => {
    test('index', async () => {
      const $ = await get('/apps')
      $('.listed-app').length.should.be.above(300)
      $('.category-list li').length.should.be.above(15)
    })

    test('redirect app/:slug to apps/:slug', async () => {
      let res = await supertest(app).get(`/app/github-desktop`)
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/apps/github-desktop')
    })

    test('index has custom title and description meta tags', async () => {
      const $ = await get('/apps')
      $('head > title').text().should.eq('Electron Apps | Electron')
      $('meta[property="og:description"]').attr('content').should.eq('Apps Built on Electron')
    })

    test('apps are sorted by date, descending', async () => {
      const $ = await get('/apps')
      const dates = $('.listed-app [data-date]')
        .map((i, el) => new Date($(el).text()))
        .get()

      const clone = dates.slice(0)
      dates.length.should.be.above(10)
      clone.sort((a, b) => new Date(b) - new Date(a)).should.deep.equal(dates)
    })

    test('no category', async () => {
      const $ = await get('/apps?category=some-category')
      $('h1').text().should.eq('404')
    })

    test('index filtered by category', async () => {
      const $ = await get('/apps?category=games')
      $('.listed-app').length.should.be.above(15)
      $('#category-games.selected').length.should.equal(1)
    })

    test('app pages apply platform labels to download links', async () => {
      const $ = await get('/apps/hyper')
      if ($('a.app-download.darwin').length === 0) {
        console.log($('.app-meta').html())
      }
      $('a.app-download.darwin').length.should.be.above(0)
      $('a.app-download.linux').length.should.be.above(0)
      $('a.app-download.win32').length.should.be.above(0)
    })

    test('renders 404 for nonexistent apps', async () => {
      const $ = await get('/apps/nonexistent-app')
      $.res.status.should.eq(404)
      $('.error-page').text().should.include('Page not found')
    })
  })

  describe('donors', () => {
    test('index', async () => {
      const $ = await get('/donors')
      $('h1').text().should.eq('Donors')
    })
  })

  describe('docs', () => {
    test('index', async () => {
      const $ = await get('/docs')
      $('header').should.have.class('site-header')
      $('a[href="/docs/tutorial/development-environment#setting-up-macos"]').should.have.text('Setting up macOS')
      $('a[href="/docs/api/auto-updater"]').should.have.text('autoUpdater')
    })

    test('API doc', async () => {
      const $ = await get('/docs/api/browser-window')
      $('.docs-breadcrumbs a').should.have.length(4)
      $('.docs-breadcrumbs a[href="/docs/api"]').should.have.text('API')
      $('.docs-breadcrumbs')
        .text()
        .trim()
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .should.include('Docs / API / BrowserWindow v')
    })

    test('redirects pre-1.0 docs URLs', async () => {
      let res = await supertest(app).get(`/docs/v0.20.0/api/app`)
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/docs/api/app')
      res = await supertest(app).get(`/docs/v0.20.0`)
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/docs')
    })

    test('redirect /docs/tutorial/faq to /docs/faq', async () => {
      const res = await supertest(app).get('/docs/tutorial/faq')
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/docs/faq')
    })

    test('redirects latest docs URLs', async () => {
      let res = await supertest(app).get(`/docs/latest/api/app`)
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/docs/api/app')
      res = await supertest(app).get(`/docs/latest`)
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('/docs')
    })

    test('docs/api/structures', async () => {
      const $ = await get('/docs/api/structures')
      $('head > title').text().should.eq('API Structures | Electron')
      $('tr').length.should.be.above(10)
    })

    test('docs/api/structures/page', async () => {
      const $ = await get('/docs/api/structures/bluetooth-device')
      $('h1 > a').text().should.eq('BluetoothDevice Object')
    })

    test('uses page title and description', async () => {
      const $ = await get('/docs/api/browser-window')
      $('head > title').text().should.eq('BrowserWindow | Electron')
      $('meta[property="og:description"]').attr('content').should.eq('Create and control browser windows.')
    })

    test('docs/all', async () => {
      const $ = await get('/docs/all')
      $('head > title').text().should.eq('All the Electron Docs! | Electron')
      const titles = $('h1')
        .map((i, el) => $(el).text())
        .get()
      titles.should.include('BluetoothDevice Object') // API Structures
      titles.should.include('BrowserWindow') // API Docs
      titles.should.include('Application Distribution') // Tutorials
    })

    test('docs/api', async () => {
      const $ = await get('/docs/api')
      $('tr').length.should.be.above(10)
    })

    test('docs/glossary', async () => {
      const $ = await get('/docs/glossary')
      $('.error-page').length.should.eq(0)
    })

    test('docs/404', async () => {
      const $ = await get('/docs/404')
      $('.error-page').text().should.include('Page not found')
    })

    test('docs/api/404', async () => {
      const $ = await get('/docs/api/404')
      $('.error-page').text().should.include('Page not found')
    })

    test('//index.php?lang=Cn&index=0000', async () => {
      const res = await supertest(app).get('//index.php?lang=Cn&index=0000')
      res.statusCode.should.equal(404)
    })

    describe('docs footer', () => {
      test('includes a link to edit the doc on GitHub', async () => {
        const $ = await get('/docs/api/accelerator')
        $('.propose-change').attr('href').should.eq('https://github.com/electron/electron/tree/master/docs/api/accelerator.md')
      })

      test('includes a link to translate the doc on Crowdin', async () => {
        const res = await supertest(app)
          .get('/docs/api/accelerator')
          .set('Cookie', ['language=zh-CN'])
        const $ = cheerio.load(res.text)
        $('.translate-on-crowdin').attr('href').should.eq('https://crowdin.com/translate/electron/63/en-zhcn')
      })

      test('includes a link to translate the doc on Crowdin for Indonesian', async () => {
        const res = await supertest(app)
          .get('/docs/api/crash-reporter')
          .set('Cookie', ['language=id-ID'])
        const $ = cheerio.load(res.text)
        $('.translate-on-crowdin').attr('href').should.eq('https://crowdin.com/translate/electron/74/en-id')
      })

      test('includes a link to Crowdin language picker when language is English', async () => {
        // Crowdin displays a nice language picker when target language does not exist
        // See https://git.io/vx1TI
        const res = await supertest(app)
          .get('/docs/api/browser-view')
          .set('Cookie', ['language=en-US'])
        const $ = cheerio.load(res.text)
        $('.translate-on-crowdin').attr('href').should.eq('https://crowdin.com/translate/electron/66/en-en')
      })

      test('includes a link to view doc history', async () => {
        const $ = await get('/docs/api/accelerator/history')
        // $('body').text().should.include('The Accelerator API was introduced in Electron v0.15.3')
        // $('head > title').text().should.eq('accelerator Version History | Electron')
        $('tr').length.should.be.above(10)
      })
    })
  })

  describe('language toggle on docs', () => {
    test('each localized documentation section should have an corresponding english section', async () => {
      const res = await supertest(app)
        .get('/docs/tutorial/desktop-environment-integration')
        .set('Cookie', ['language=zh-CN'])
      const $ = cheerio.load(res.text)
      const $chineseSections = $('.docs .sub-section[data-lang="zh-CN"]')
      const $englishSections = $('.docs .sub-section[data-lang="en-US"]')
      $chineseSections.length.should.be.above(0)
      $englishSections.length.should.equal($chineseSections.length)
      $chineseSections.each((i, elem) => {
        const name = $(elem).data('name')
        $(`.docs .sub-section[data-lang="en-US"][data-name="${name}"]`).length.should.be.above(0)
      })
    })

    test('english sections should be hidden at load', async () => {
      const res = await supertest(app)
        .get('/docs/tutorial/desktop-environment-integration')
        .set('Cookie', ['language=zh-CN'])
      const $ = cheerio.load(res.text)
      $('.docs .sub-section[data-lang="en-US"]').each((i, elem) => {
        $(elem).should.have.class('hidden')
      })
    })

    test('docs/all should not load any english section', async () => {
      const res = await supertest(app)
        .get('/docs/all')
        .set('Cookie', ['language=zh-CN'])
      const $ = cheerio.load(res.text)
      $('.docs .sub-section[data-lang="zh-CN"]').length.should.be.above(0)
      $('.docs .sub-section[data-lang="en-US"]').length.should.equal(0)
      $('.docs button.en-toggle').length.should.equal(0)
    })
  })

  describe('releases', () => {
    test('redirect /releases to /releases/stable', async () => {
      let res = await supertest(app).get(`/releases`)
      res.statusCode.should.equal(301)
      res.headers.location.should.equal('/releases/stable')
    })

    test('/releases/stable', async () => {
      const $ = await get('/releases/stable')
      $('h1').text().should.include('Releases')
      $('.release-entry').length.should.eq(5)
      $('a.releases-link-stable').hasClass('active').should.eq(true)
      const pages = $('.paginate-container .page-link').last()
      const lastPage = parseInt(pages.text().trim(), 10)
      lastPage.should.be.gt(50)

      const titles = $('.release-entry').map((i, el) => $(el).text().trim()).get()
      titles.forEach(title => {
        title.should.match(/Electron \d+\.\d+\.\d/)
      })
    })

    test('/releases/beta', async () => {
      const $ = await get('/releases/beta')
      $('h1').text().should.include('Releases')
      $('.release-entry').length.should.eq(5)
      $('a.releases-link-beta').hasClass('active').should.eq(true)
      const pages = $('.paginate-container .page-link').last()
      const lastPage = parseInt(pages.text().trim(), 10)
      lastPage.should.be.gt(5)

      const titles = $('.release-entry').map((i, el) => $(el).text().trim()).get()
      titles.forEach(title => {
        title.should.match(/Electron \d+\.\d+\.\d+-beta\.\d+/)
      })
    })

    test('/releases/nightly', async () => {
      const $ = await get('/releases/nightly')
      $('h1').text().should.include('Releases')
      $('.release-entry').length.should.eq(5)
      $('a.releases-link-nightly').hasClass('active').should.eq(true)
      const pages = $('.paginate-container .page-link').last()
      const lastPage = parseInt(pages.text().trim(), 10)
      lastPage.should.be.gt(3)

      const titles = $('.release-entry').map((i, el) => $(el).text().trim()).get()
      titles.forEach(title => {
        title.should.match(/Electron \d+\.\d+\.\d+-nightly\.\d+/)
      })
    })

    test('/docs/versions redirects to /releases/stable', async () => {
      const res = await supertest(app).get('/docs/versions')
      res.statusCode.should.be.equal(301)
      res.headers.location.should.equal('/releases/stable')
    })
  })

  describe('userland', () => {
    test('userland/404', async () => {
      const $ = await get('/userland/404')
      $('.error-page').text().should.include('Page not found')
    })
  })

  test('/blog', async () => {
    const $ = await get('/blog')
    $('header').should.have.class('site-header')
    $('.posts-list li').length.should.be.above(10)
  })

  test('/blog/webtorrent', async () => {
    const $ = await get('/blog/webtorrent')
    $('header').should.have.class('site-header')
    // TODO: post title is page title
  })

  test('/awesome', async () => {
    const res = await supertest(app).get('/awesome')
    res.statusCode.should.be.above(300).and.below(303)
    res.headers.location.should.equal('/community')
  })

  describe('/community', () => {
    test('display lists of content from awesome-electron', async () => {
      const $ = await get('/community')
      $('h1').text().should.eq('Electron Community')

      const titles = $('h2').map((i, el) => $(el).text()).get()
      titles.should.include('Tools')
      titles.should.include('Components')
      titles.should.include('Meetups')
    })

    test('includes localized content', async () => {
      const res = await supertest(app)
        .get('/community')
        .set('Cookie', ['language=vi-VN'])
      const $ = cheerio.load(res.text)
      $('.subtron .container-narrow h1').text().should.eq(i18n.website['vi-VN'].community.title)
    })

    test('/contact redirects to /community', async () => {
      const res = await supertest(app).get('/contact')
      res.statusCode.should.be.equal(301)
      res.headers.location.should.equal('/community')
    })
  })

  describe('localized strings for client-side code', () => {
    it('sets meta tags for clipboard labels', async () => {
      const $ = await get('/')
      $('meta[name="localized.clipboard.copy"]').attr('content').should.eq('Copy')
      $('meta[name="localized.clipboard.copy_to_clipboard"]').attr('content').should.eq('Copy to Clipboard')
    })
  })

  describe('devtron and spectron', () => {
    test('Test existed landing pages', async () => {
      let $ = await get('/devtron')
      $('.jumbotron-lead .jumbotron-lead-muted').text().should.eq('An Electron DevTools Extension')
      $ = await get('/spectron')
      $('.jumbotron-lead .jumbotron-lead-muted').text().should.eq('An Electron Testing Framework (currently unmaintained)')
    })
  })

  describe('electron fiddle', () => {
    test('Fiddle landing page existed', async () => {
      const $ = await get('/fiddle')
      $('.jumbotron-lead .jumbotron-lead-muted').text().should.eq('The easiest way to get started with Electron')
    })
  })

  describe('languages', () => {
    test('/languages', async () => {
      const $ = await get('/languages')
      $('h1').text().should.eq('Languages')
      $('body').text().should.include('global developer community')
    })

    test('language query param for one-off viewing in other languages', async () => {
      const frenchContent = 'fenêtres'
      const sesh = session(app)

      let res = await sesh.get('/docs/api/browser-window?lang=fr-FR')
      let $ = cheerio.load(res.text)
      $('blockquote').text().should.include(frenchContent)

      // verify that the query param does not persist as a cookie
      res = await sesh.get('/docs/api/browser-window')
      $ = cheerio.load(res.text)
      $('blockquote').text().should.not.include(frenchContent)
    })

    test('incompleted language query param redirects with the correct language', async () => {
      // Missing region
      let res = await supertest(app).get('/docs/api/browser-window?lang=fr')
      res.statusCode.should.be.equal(302)
      res.headers.location.should.equal('/docs/api/browser-window?lang=fr-FR')

      // wrong cases
      res = await supertest(app).get('/docs/api/browser-window?lang=ES')
      res.statusCode.should.be.equal(302)
      res.headers.location.should.equal('/docs/api/browser-window?lang=es-ES')

      res = await supertest(app).get('/docs/api/browser-window?lang=ES-es')
      res.statusCode.should.be.equal(302)
      res.headers.location.should.equal('/docs/api/browser-window?lang=es-ES')

      // missing Argentina region
      res = await supertest(app).get('/docs/api/browser-window?lang=es-AR')
      res.statusCode.should.be.equal(302)
      res.headers.location.should.equal('/docs/api/browser-window?lang=es-ES')
    })

    test('language query param wont redirects with the correct language', async () => {
      // without language query is not redirected (200)
      let res = await supertest(app).get('/docs/api/browser-window')
      res.statusCode.should.be.equal(200)

      // valid language query is not redirected (200)
      const langs = [
        'ar-SA', 'bg-BG', 'cs-CZ', 'de-DE', 'en-US', 'es-ES',
        'fa-IR', 'fil-PH', 'fr-FR', 'hi-IN', 'id-ID', 'it-IT',
        'ja-JP', 'ko-KR', 'nl-NL', 'pl-PL', 'pt-BR', 'ru-RU',
        'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-TW'
      ]
      for (let lang of langs) {
        res = await supertest(app).get(`/docs/api/browser-window?lang=${lang}`)
        res.statusCode.should.be.equal(200)
        res.statusCode.should.equal(200)
      }
    })

    describe('<dir> HTML tag for right-to-left languages', () => {
      test('is `ltr` by default', async () => {
        const res = await supertest(app).get(`/`)
        const $ = cheerio.load(res.text)
        $('html').attr('dir').should.equal('ltr')
      })

      test('is `rtl` for Arabic', async () => {
        const res = await supertest(app).get(`/?lang=ar-SA`)
        const $ = cheerio.load(res.text)
        $('html').attr('dir').should.equal('rtl')
      })

      test('is `rtl` for Hebrew', async () => {
        const res = await supertest(app).get(`/?lang=he-IL`)
        const $ = cheerio.load(res.text)
        $('html').attr('dir').should.equal('rtl')
      })
    })

    test('redirects for date-style blog URLs', async () => {
      const res = await supertest(app).get('/blog/2017/06/01/typescript')
      res.statusCode.should.be.above(300).and.below(303)
      res.headers.location.should.equal('/blog/typescript')
    })

    test('redirects trailing slashes', async () => {
      const res = await supertest(app).get('/apps/')
      res.statusCode.should.equal(301)
      res.headers.location.should.equal('/apps')
    })
  })

  describe('issues and pull request URLs', () => {
    test('redirects /issues to the website repo, for convenience', async () => {
      const res = await supertest(app).get('/issues')
      res.statusCode.should.equal(301)
      res.headers.location.should.equal('https://github.com/electron/electronjs.org/issues')
    })

    test('redirects /issues/new to the website repo, for convenience', async () => {
      const res = await supertest(app).get('/issues/new')
      res.statusCode.should.equal(301)
      res.headers.location.should.equal('https://github.com/electron/electronjs.org/issues/new')
    })

    test('redirects /pulls to the website repo, for convenience', async () => {
      const res = await supertest(app).get('/pulls')
      res.statusCode.should.equal(301)
      res.headers.location.should.equal('https://github.com/electron/electronjs.org/pulls')
    })
  })

  describe('proxy to crowdin API', () => {
    beforeEach(() => {
      process.env.CROWDIN_KEY = '123'
    })

    afterEach(() => {
      delete process.env.CROWDIN_KEY
    })

    test('hits crowdin API', async () => {
      const mock = nock('https://api.crowdin.com')
        .get('/api/project/electron/info')
        .query({ key: process.env.CROWDIN_KEY, json: true })
        .once()
        .reply(200, { stats: 'mocked' })

      const res = await supertest(app).get('/crowdin/info')
      res.statusCode.should.equal(200)
      res.type.should.equal('application/json')
      res.text.should.eq('{"stats":"mocked"}')

      mock.done()
    })

    test('parses url query properly through proxy', async () => {
      const mock = nock('https://api.crowdin.com')
        .get('/api/project/electron/export-file')
        .query({
          key: process.env.CROWDIN_KEY,
          json: true,
          language: 'zh-CN',
          file: 'master/content/en-US/docs/api/browser-window.md'
        })
        .once()
        .reply(200, { result: 'mocked' })

      const res = await supertest(app).get('/crowdin/export-file?language=zh-CN&file=master/content/en-US/docs/api/browser-window.md')
      res.statusCode.should.equal(200)
      res.type.should.equal('application/json')
      res.text.should.eq('{"result":"mocked"}')

      mock.done()
    })

    test('returns 404 when trying to access API endpoints that are not whitelisted', async () => {
      const res = await supertest(app).get('/crowdin/export')
      res.statusCode.should.equal(404)
    })

    test('returns 401 when CROWDIN_KEY is not set', async () => {
      delete process.env.CROWDIN_KEY
      const res = await supertest(app).get('/crowdin/status')
      res.statusCode.should.equal(401)
      res.type.should.equal('application/json')
      res.text.should.eq('"process.env.CROWDIN_KEY is not set"')
    })

    test('returns 405 on request with method other than GET', async () => {
      const res = await supertest(app).post('/crowdin/add-file')
      res.statusCode.should.equal(405)
      res.type.should.equal('application/json')
      res.text.should.eq('"POST not allowed"')
    })
  })

  describe('Service tests', () => {
    it('redirect /maintainers/join to G Forms', async () => {
      let res = await supertest(app).get(`/maintainers/join`)
      res.statusCode.should.equal(302)
    })

    it('get /service-worker.js', async () => {
      let res = await supertest(app).get('/service-worker.js')
      res.headers['content-type'].should.equal('application/javascript; charset=UTF-8')
    })

    describe('node headers', () => {
      it('redirects valid to S3 Bucket', async () => {
        let res = await supertest(app).get(`/headers/v3.1.6/iojs-3.1.6.tgz.tz`)
        res.statusCode.should.equal(302)
      })

      it('show 404 to invalid', async () => {
        let res = await supertest(app).get(`/headers`)
        res.statusCode.should.equal(404)
      })
    })

    describe('search redirects', () => {
      it('redirect /search/package to home page search', async () => {
        const res = await supertest(app).get('/search/npmPackages?q=@siberianmh/cosmos')
        res.statusCode.should.equal(302)
        res.headers.location.should.equal('/?query=@siberianmh/cosmos')
      })

      it('redirect /search to home page', async () => {
        const res = await supertest(app).get('/search')
        res.statusCode.should.equal(302)
        res.headers.location.should.equal('/')
      })
    })
  })
})
