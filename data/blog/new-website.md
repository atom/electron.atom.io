---
title: "Electron's New Internationalized Website"
author: zeke
date: '2017-11-13'
---

Electron has a new website at [electronjs.org]! We've replaced 
our static Jekyll site with a Node.js webserver, giving us flexibility to
internationalize the site and paving the way for more exciting new features.

---

## 🌍 Translations

We've begun the process of internationalizing the website with the 
goal of making Electron app development accessible to a global audience of 
developers. We're using a localization platform called [Crowdin] that integrates 
with GitHub, opening and updating pull requests automatically as content is translated into different languages.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav in Simplified Chinese"/>
    <figcaption>Electron's Nav in Simplified Chinese</figcaption>
  </a>
</figure>

Though we've been working quietly on this effort so far, 
over 75 Electron community members have already discovered the project 
organically and joined in the effort to internationalize the website and 
translate Electron's docs into over 20 languages. We are seeing [daily 
contributions](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) from people all over the world, with translations for 
languages like French, Vietnamese, Indonesian, and Chinese leading the way.

To choose your language and view translation progress, visit [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Current target languages on Crowdin"/>
    <figcaption>Translations in progress on Crowdin</figcaption>
  </a>
</figure>

If you're multilingual and interested in helping translate Electron's docs
and website, visit the [electron/electron-i18n] repo, or jump right into 
translating on [Crowdin], where you can sign in using your GitHub account.

There are currently 21 languages enabled for the Electron project on Crowdin. 
Adding support for more languages is easy, so if you're interested in 
helping translate but you don't see your language listed, 
[let us know](https://github.com/electron/electronjs.org/issues/new) and
we'll enable it.

## Raw Translated Docs

If you prefer to read documentation in raw markdown files, you 
can now do that in any language:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## App Pages

As of today, any Electron app can easily have its own page on the Electron 
site. For a few examples, check out 
[Etcher](https://electronjs.org/apps/etcher),
[1Clipboard](https://electronjs.org/apps/1clipboard), or 
[GraphQL Playground](https://electronjs.org/apps/graphql-playground), pictured
here on the Japanese version of the site:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground"/>
  </a>
</figure>

There are some incredible Electron apps out there, but they're not always easy
to find, and not every developer has the time or resources to build a proper 
website to market and distribute their app.

Using just a 
[PNG icon file and a small amount of app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md),
we're able to collect a lot of information about a given app.
Using data collected from GitHub, app pages can now display screenshots, 
download links, versions, release notes, and READMEs for every app that 
has a public repository. Using a color palette extracted from each app's icon,
we can produce [bold and accessible colors](https://github.com/zeke/pick-a-good-color)
to give each app page some visual distinction.  

The [apps index page](https://electronjs.org/apps) now also has categories 
and a keyword filter to find interesting apps like [GraphQL GUIs](https://electronjs.org/apps?q=graphql)
and [p2p tools](https://electronjs.org/apps?q=graphql).

If you've got an Electron app that you'd like featured on the site, open a 
pull request on the [electron/electron-apps] repository.

## One-line Installation with Homebrew

The [Homebrew] package manager for macOS has a subcommand called [cask]
that makes it easy to install desktop apps using a single command in your
terminal, like `brew cask install atom`.

We've begun collecting Homebrew cask names for popular Electron apps and are now
displaying the installation command (for macOS visitors) on every app page 
that has a cask:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png"/>
   <figcaption>Installation options tailored for your platform: macOS, Windows, Linux</figcaption>
  </a>
</figure>

To view all the apps that have homebrew cask names, visit 
[electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). If 
you know of other apps with casks that we haven't indexed yet, 
[please add them!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 A New Domain

We've moved the site from electron.atom.io to a new domain: [electronjs.org].

The Electron project was born inside [Atom], GitHub's open-source text editor 
built on web technologies. Electron was originally called `atom-shell`. Atom 
was the first app to use it, but it didn't take long for folks to realize that 
this magical Chromium + Node runtime could be used for all kinds of different 
applications. When companies like Microsoft and Slack started to make use of
`atom-shell`, it became clear that the project needed a new name.

And so "Electron" was born. In early 2016, GitHub assembled a new team to focus
specifically on Electron development and maintenance, apart from Atom. In the 
time since, Electron has been adopted by thousands of app developers, and is now
depended on by many large companies, many of which have Electron teams of 
their own.

Supporting GitHub's Electron projects like Atom and [GitHub Desktop] is still a 
priority for our team, but by moving to a new domain we hope to help clarify 
the technical distinction between Atom and Electron.

## 🐢🚀 Node.js Everywhere

The previous Electron website was built with [Jekyll], the popular Ruby-based 
static site generator. Jekyll is a great tool for building static websites, but 
the website had started to outgrow it. We wanted more dynamic capabilities like proper redirects and dynamic content rendering, so a [Node.js] server was the obvious choice.

The Electron ecosystem includes projects with components written in many 
different programming languages, from Python to C++ to Bash. But JavaScript is foundational to Electron, and it's the language used most in our community.

By migrating the website from Ruby to Node.js, we aim to lower the barrier to 
entry for people wishing to contribute to the website.

## ⚡️ Easier Open-Source Participation

If you've got [Node.js] (8 or higher) and 
[git](https://git-scm.org) installed on your system, you can easily get the 
site running locally:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

The new website is hosted on Heroku. We use deployment pipelines and the
[Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps)
feature, which automatically creates a running copy of the app for every pull 
request. This makes it easy for reviewers to view the actual effects of a 
pull request on a live copy of the site.

## 🙏 Thanks to Contributors

We'd like to give special thanks to all the folks around the world who have 
contributed their own time and energy to help improve Electron. The passion of 
the open-source community has helped immeasurably in making Electron a success.
Thank you!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png"/>
</figure>


[Atom]: https://atom.io
[cask]: https://caskroom.github.io
[crowdin.com/project/electron]: https://crowdin.com/project/electron
[Crowdin]: https://crowdin.com/project/electron
[electron/electron-apps]: https://github.com/electron/electron-apps
[electron/electron-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[GitHub Desktop]: https://desktop.github.com
[Homebrew]: https://brew.sh
[Jekyll]: https://jekyllrb.com
[Node.js]: https://nodejs.org
