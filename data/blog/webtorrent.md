---
title: 'Project of the Week: WebTorrent'
author: 
  - feross
  - zeke
date: '2017-03-14'
---

This week we caught up with [@feross](https://github.com/feross) and [@dcposch](https://github.com/dcposch) to talk about WebTorrent, the web-powered torrent client that connects users together to form a distributed, decentralized browser-to-browser network.

---

## What is WebTorrent?

[WebTorrent](https://webtorrent.io) is the first torrent client that works in the browser. It's written completely in JavaScript and it can use WebRTC for peer-to-peer transport. No browser plugin, extension, or installation is required.

Using open web standards, WebTorrent connects website users together to form a distributed, decentralized browser-to-browser network for efficient file transfer.

You can see a demo of WebTorrent in action here: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="webtorrent homepage" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg"/>
</a>

## Why is this cool?

Imagine a video site like YouTube, but where visitors help to host the site's content. The more people that use a WebTorrent-powered website, the faster and more resilient it becomes.

Browser-to-browser communication cuts out the middle-man and lets people communicate on their own terms. No more client/server – just a network of peers, all equal. WebTorrent is the first step in the journey to re-decentralize the Web.

## Where does Electron come into the picture?

About one year ago, we decided to build [WebTorrent Desktop](https://webtorrent.io/desktop/), a version of WebTorrent that runs as a desktop app.

[![WebTorrent Desktop player window](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

We created WebTorrent Desktop for three reasons:

1. We wanted a clean, lightweight, ad-free, open source torrent app
2. We wanted a torrent app with good streaming support
3. We need a "hybrid client" that connects the BitTorrent and WebTorrent networks

## If we can already download torrents in my web browser, why a desktop app?

First, a bit of background on the design of WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="webtorrent desktop logo" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right"/>
</a>

In the early days, BitTorrent used TCP as its transport protocol. Later, uTP came along promising better performance and additional advantages over TCP. Every mainstream torrent client eventually adopted uTP, and today you can use BitTorrent over either protocol. The WebRTC protocol is the next logical step. It brings the promise of interoperability with web browsers – one giant P2P network made up of all desktop BitTorrent clients and millions of web browsers.

“Web peers” (torrent peers that run in a web browser) make the BitTorrent network stronger by adding millions of new peers, and spreading BitTorrent to dozens of new use cases. WebTorrent follows the BitTorrent spec as closely as possible, to make it easy for existing BitTorrent clients to add support for WebTorrent.

Some torrent apps like [Vuze](https://www.vuze.com/) already support web peers, but we didn't want to wait around for the rest to add support. **So basically, WebTorrent Desktop was our way to speed up the adoption of the WebTorrent protocol.** By making an awesome torrent app that people really want to use, we increase the number of peers in the network that can share torrents with web peers (i.e. users on websites).

## What are some interesting use cases for torrents beyond what people already know they can do?

One of the most exciting uses for WebTorrent is peer-assisted delivery. Non-profit projects like [Wikipedia](https://www.wikipedia.org/) and the [Internet Archive](https://archive.org/) could reduce bandwidth and hosting costs by letting visitors chip in. Popular content can be served browser-to-browser, quickly and cheaply. Rarely-accessed content can be served reliably over HTTP from the origin server.

The Internet Archive actually already updated their torrent files so they work great with WebTorrent. So if you want to embed Internet Archive content on your site, you can do it in a way that reduces hosting costs for the Archive, allowing them to devote more money to actually archiving the web!

There are also exciting business use cases, from CDNs to app delivery over P2P.

## What are some of your favorite projects that use WebTorrent?

![gaia app screenshot](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

The coolest thing built with WebTorrent, hands down, is probably [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). It's a slick 3D interactive simulation of the Milky Way. The data loads from a torrent, right in your browser. It's awe-inspiring to fly through our star system and realize just how little we humans are compared to the vastness of our universe.

You can read about how this was made in [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), a blog post where the author, Charlie Hoey, explains how he built the star map with WebGL and WebTorrent.

<a href="https://brave.com/">
  <img alt="brave logo" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left"/>
</a>

We're also huge fans of [Brave](https://brave.com/). Brave is a browser that automatically blocks ads and trackers to make the web faster and safer. Brave recently added torrent support, so you can [view traditional torrents without using a separate app](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). That feature is powered by WebTorrent.

So, just like how most browsers can render PDF files, Brave can render magnet links and torrent files. They're just another type of content that the browser natively supports.

One of the co-founders of Brave is actually Brendan Eich, the creator of JavaScript, the language we wrote WebTorrent in, so we think it's pretty cool that Brave chose to integrate WebTorrent.

## Why did you choose to build WebTorrent Desktop on Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="WebTorrent Desktop main window" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450"/>
</a>

There is a meme that Electron apps are "bloated" because they include the entire Chrome content module in every app. In some cases, this is partially true (an Electron app installer is usually ~40MB, where an OS-specific app installer is usually ~20MB).

However, in the case of WebTorrent Desktop, we use nearly every Electron feature, and many dozens of Chrome features in the course of normal operation. If we wanted to implement these features from scratch for each platform, it would have taken months or years longer to build our app, or we would have only been able to release for a single platform.

Just to get an idea, we use Electron's [dock integration](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (to show download progress), [menu bar integration](https://electronjs.org/docs/api/menu) (to run in the background), [protocol handler registration](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (to open magnet links), [power save blocker](https://electronjs.org/docs/api/power-save-blocker/) (to prevent sleep during video playback), and [automatic updater](https://electronjs.org/docs/api/auto-updater). As for Chrome features, we use plenty: the `<video>` tag (to play many different video formats), the `<track>` tag (for closed captions support), drag-and-drop support, and WebRTC (which is non-trivial to use in a native app).

Not to mention: our torrent engine is written in JavaScript and assumes the existence of lots of Node APIs, but especially `require('net')` and `require('dgram')` for TCP and UDP socket support.

Basically, Electron is just what we needed and had the exact set of features we needed to ship a solid, polished app in record time.

## What are your favorite things about Electron?

The WebTorrent library has been in development as an open source side project for two years. **We made WebTorrent Desktop in four weeks.** Electron is the primary reason that we were able to build and ship our app so quickly.

Just as Node.js made server programming accessible to a generation of jQuery-using front-end programmers, Electron makes native app development accessible to anyone familiar with Web or Node.js development. Electron is extremely empowering.

## Do the website and the Desktop client share code?

Yes, the [`webtorrent` npm package](https://npmjs.com/package/webtorrent) works in Node.js, in the browser, and in Electron. The exact same code can run in all environments – this is the beauty of JavaScript. It's today's universal runtime. Java Applets promised "Write Once, Run Anywhere" apps, but that vision never really materialized for a number of reasons. Electron, more than any other platform, actually gets pretty darn close to that ideal.

## What are some challenges you've faced while building WebTorrent?

In early versions of the app, we struggled to make the UI performant. We put the torrent engine in the same renderer process that draws the main app window which, predictably, led to slowness anytime there was intense CPU activity from the torrent engine (like verifying the torrent pieces received from peers).

We fixed this by moving the torrent engine to a second, invisible renderer process that we communicate with over [IPC](https://electronjs.org/docs/api/ipc-main/). This way, if that process briefly uses a lot of CPU, the UI thread will be unaffected. Buttery-smooth scrolling and animations are so satisfying.

Note: we had to put the torrent engine in a renderer process, instead of a "main" process, because we need access to WebRTC (which is only available in the renderer.)

## In what areas should Electron be improved?

One thing we'd love to see is better documentation about how to build and ship production-ready apps, especially around tricky subjects like code signing and auto-updating. We had to learn about best practices by digging into source code and asking around on Twitter!

## Is WebTorrent Desktop done? If not, what's coming next?

We think the current version of WebTorrent Desktop is excellent, but there's always room for improvement. We're currently working on improving polish, performance, subtitle support, and video codec support.

If you're interested in getting involved in the project, check out [our GitHub page](https://github.com/feross/webtorrent-desktop)!

## Any Electron development tips that might be useful to other developers?

[Feross](http://feross.org/), one of the WebTorrent Desktop contributors, recently gave a talk *"Real world Electron: Building Cross-platform desktop apps with JavaScript"* at NodeConf Argentina that contains useful tips for releasing a polished Electron app. The talk is especially useful if you're at the stage where you have a basic working app and you're trying to take it to the next level of polish and professionalism.

[Watch here](https://www.youtube.com/watch?v=YLExGgEnbFY):

<iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen></iframe>

[Slides here](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), another WebTorrent contributor, wrote [a checklist of things you can do](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) to make your app feel polished and native. It comes with code examples and covers things like macOS dock integration, drag-and-drop, desktop notifications, and making sure your app loads quickly.
