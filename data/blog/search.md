---
title: Search
author: 
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

The Electron website has a new search engine that delivers instant results for
API docs, tutorials, Electron-related npm packages, and more.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron Search Screenshot"/>
  </a>
</figure>

---

Learning a new technology or framework like Electron can be intimidating. 
Once you get past the [quick-start] phase, it can 
be difficult to learn best practices, find the right APIs, or discover the tools 
that will help you build the app of your dreams. We want the Electron website to 
be a better tool for finding the resources you need to build apps faster and 
more easily.

Visit any page on [electronjs.org](https://electronjs.org) and you'll find the 
new search input at the top of the page.

## The Search Engine

When we first set about adding search to the website, we rolled our own
search engine using GraphQL as a backend. GraphQL was fun to work with and
the search engine was performant, but we quickly realized that building a search
engine is not a trivial task. Things like multi-word search and typo detection
require a lot of work to get right. Rather than reinventing the wheel, 
we decided to use an existing search solution: [Algolia].

Algolia is a hosted search service that has quickly become the
search engine of choice among popular open source projects like 
React, Vue, Bootstrap, Yarn, and [many others](https://community.algolia.com/docsearch/).

Here are some of the features that made Algolia a good fit for the Electron project:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) provides results as you type, usually in about 1ms.
- [Typo tolerance](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) means you'll still get results even when you type [`widnow`].
- [Advanced query syntax](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) enables `"exact quoted matches"` and `-exclusion`.
- [API clients](https://www.algolia.com/doc/api-client/javascript/getting-started/) are open source and with well-documented.
- [Analytics](https://www.algolia.com/doc/guides/analytics/analytics-overview/) tell us what people are searching for most, as well as what they're searching for but not finding. This will give us valuable insight into how Electron's documentation can be improved.
- Algolia is [free for open source projects](https://www.algolia.com/for-open-source).

## API Docs

Sometimes you know *what* you want to accomplish, but you don't know exactly 
*how* to do it. Electron has over 750 API methods, events, and properties. 
No human can easily remember all of them, but computers are good at this stuff. 
Using Electron's [JSON API docs](https://electronjs.org/blog/api-docs-json-schema),
we indexed all of this data in Algolia, and now you can easily find
the exact API you're looking for.

Trying to resize a window? Search for [`resize`] and jump straight to the method you need.

## Tutorials

Electron has an ever-growing collection of tutorials to complement its API
documentation. Now you can more easily find tutorials on a given topic,
right alongside related API documentation.

Looking for security best practices? Search for [`security`].

## npm Packages

There are now over 700,000 packages in the npm registry and it's not
always easy to find the one you need. To make it easier to discover these modules, 
we've created [`electron-npm-packages`], a collection of the 3400+ modules in 
the registry that are built specifically for use with Electron.

The folks at [Libraries.io] have created [SourceRank],
a system for scoring software projects based on a combination of metrics like
code, community, documentation, and usage. We created a [`sourceranks`]
module that includes the score of every module in the npm registry, and we
use these scores to sort the package results.

Want alternatives to Electron's built-in IPC modules? Search for [`is:package ipc`].

## Electron Apps

It's [easy to index data with Algolia](https://github.com/electron/algolia-indices), 
so we added the existing apps list from [electron/apps](https://github.com/electron/apps).

Try a search for [`music`] or [`homebrew`].

## Filtering Results

If you've used GitHub's [code search](https://github.com/search) before,
you're probably aware of its colon-separated key-value filters like
`extension:js` or `user:defunkt`. We think this filtering technique is pretty
powerful, so we've added an `is:` keyword to Electron's search that lets you
filter results to only show a single type:

- [`is:api thumbnail`]
- [`is:tutorial security`]
- [`is:package ipc`]
- [`is:app graphql`]

## Keyboard Navigation

People love keyboard shortcuts! The new search can be used without taking
your fingers off the keyboard:

- <kbd>/</kbd> focuses the search input
- <kbd>esc</kbd> focuses the search input and clears it
- <kbd>down</kbd> moves to the next result
- <kbd>up</kbd> moves to the previous result, or the search input
- <kbd>enter</kbd> opens a result

We also open-sourced the [module](https://github.com/electron/search-with-your-keyboard/)
that enables this keyboard interaction. It's designed for use with Algolia InstantSearch, 
but is generalized to enable compatibility with different search implementations.

## We want your feedback

If you encounter any issues with the new search tool, we want to hear about it!

The best way to submit your feedback is by filing an issue on GitHub in the 
appropriate repository:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) is the Electron website. If you don't know where to file an issue, this your best bet.
- [electron/algolia-indices](https://github.com/electron/algolia-indices) is where all the searchable Electron data is compiled.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) makes the search interface navigable by keyboard.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) is the browser-side client that enables find-as-you-type search.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) is the Node.js client for uploading data to Algolia's servers.

## Thanks

Special thanks to [Emily Jordan](https://github.com/echjordan)
and [Vanessa Yuen](https://github.com/vanessayuenn) 
for building these new search capabilities, to [Libraries.io] for providing 
[SourceRank] scores, and to the team at Algolia for helping us get started. 🍹

[`electron-npm-packages`]: https://ghub.io/electron-npm-packages
[`homebrew`]: https://electronjs.org/?query=homebrew
[`is:api thumbnail`]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`is:app graphql`]: https://electronjs.org/?query=is%3Aapp%20graphql
[`is:package ipc`]: https://electronjs.org/?query=is%3Apackage%20ipc
[`is:tutorial security`]: https://electronjs.org/?query=is%3Atutorial%20security
[`music`]: https://electronjs.org/?query=music
[`resize`]: https://electronjs.org/?query=resize
[`security`]: https://electronjs.org/?query=security
[`sourceranks`]: https://github.com/nice-registry/sourceranks
[`widnow`]: https://electronjs.org/?query=widnow
[Algolia]: https://algolia.com
[Libraries.io]: https://libraries.io
[quick-start]: https://github.com/electron/electron-quick-start
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank
