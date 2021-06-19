---
title: 'Project of the Week: Ghost'
author: 
  - felixrieseberg
  - zeke
date: '2017-02-14'
---

This week we chatted with [Felix Rieseberg](https://felixrieseberg.com/), desktop engineer at [Slack](https://slack.com/) and maintainer of [Ghost Desktop](https://ghost.org/downloads/), an Electron client for the [Ghost](https://ghost.org/) publishing platform.

---

<div class="pt-5">
  <img src="https://cloud.githubusercontent.com/assets/2289/22913898/7396b0de-f222-11e6-8e5d-147a7ced37a9.png" alt="Ghost Desktop Screenshot"/> 
</div>

## What is Ghost?

Ghost is a fully open source, hackable platform for building and running a modern online publication. We power blogs, magazines and journalists from Zappos to Sky News.

## What makes it different from other publishing platforms?

Ghost was founded in April 2013, after a very successful Kickstarter campaign to create a new platform focused solely on professional publishing. Our mission is to create the best open source tools for independent journalists and writers across the world, and have a real impact on the future of online media. It offers a simpler, more focussed experience: Our editor is designed solely around providing the best possible writing experience.

Compared to the all-time classic WordPress, it offers a simpler, more streamlined experience - it is easier to setup and maintain, comes with all important features out-of-the-box, and is dramatically faster. Compared to other online platforms, Ghost gives writers full ownership and control over their content, allows full customization, and enables authors to build a business around their publication.

## Is Ghost a for-profit company?

This one is important to us: Ghost is an independent non-profit organisation. We build publishing tools for modern journalism & blogging because we believe freedom of speech is important. Our software is released under a [free open source license](https://github.com/TryGhost/Ghost), our business model is [completely transparent](https://blog.ghost.org/year-3/), and our legal structure means that 100% of the money we make is reinvested into making Ghost better.

## What is Ghost Desktop?

Ghost Desktop allows writers to manage multiple blogs at once - and to focus on their writing. Simple things like common writing shortcuts can't be realized in a browser, but are available in our desktop app. It allows other applications to communicate directly [with the blog via deeplinks](https://github.com/tryghost/ghost-desktop/blob/master/docs/deeplinks.md).

## What is Ghost for Journalism?

This year we're very excited to be dedicating our entire 10 person full-time Ghost team to helping grow three independent publications, along with $45,000 in resources toward their efforts. We're calling it [Ghost for Journalism](https://ghost.org/journalism/).

We've been building Ghost as the web's next great platform for independent publishers for about three and half years now, and we've now reached a really interesting inflection point. We started this journey to create a simple, well designed blogging platform which could be used by just about anyone. That was always going to be step one.

Long term, we want Ghost to be an incredible platform for the world's best journalism, and that means we need to build features to attract exactly those people. This year we're making a very conscious decision to focus on just that.

## Why did you choose to build Ghost Desktop on Electron?

Ghost uses JavaScript and Node.js on both the backend and frontend, so being able to utilize the same technology and skillset enables our team to move faster, build more, and ultimately deliver a better experience. In addition, being able to share more than 95% of code between the macOS, Windows, and Linux version of the app allows us to focus on building a great core user experience, without having to maintain one code base for each platform.

## What are some challenges you've faced while building Ghost Desktop?

Spellchecking is likely still one of the most difficult services offered - we could easily utilize one of the many online services, but correctly spellchecking text in multiple languages while guarding the privacy and autonomy of our users is not an easy task.

## In what areas should Electron be improved?

We would love to see Electron bring the operating system's native spellchecking capabilities to their apps. We're dreaming about a world in which an `<input>` field receives the same services as a `NSTextView`, but we are also intimately aware how difficult that is.

## What are your favorite things about Electron?

JavaScript is famous for being a vast ecosystem, involving countless tools and frameworks - but the convenience it affords us is hard to overstate. Building an app with Electron is only _slightly_ harder than building a web app, which is an amazing  feat.

## Is Ghost done? If not, what's coming next?

Ghost Desktop is also an ongoing project - we're pretty far from being done. We have been talking for a while about bringing a full offline mode to our users, and we're getting fairly close. Other notable work areas are the extension and integration with other text editing apps (like Word or Atom), ultimately allowing people to write posts using their favorite tools. In general, once we've shipped the offline mode feature, we're looking for deeper integration with the operating system. If that sounds interesting to you, [join us](https://github.com/tryghost/ghost-desktop)!

## What are some of your favorite Electron apps?

I'm a big fan of [Kap](https://getkap.co/), [Felony](https://github.com/henryboldi/felony), and [Visual Studio Code](https://code.visualstudio.com).

👻
