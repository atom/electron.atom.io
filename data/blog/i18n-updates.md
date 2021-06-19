---
title: "Internationalization Updates"
author: vanessayuenn
date: '2018-06-20'
---

Ever since the [launch](https://electronjs.org/blog/new-website) of the new internationalized Electron website, we have been working hard to make the Electron development experience even more accessible to developers outside of the English speaking world.

So here we are with some exciting i18n updates!

---

## 🌐 Language Toggle

Did you know that many people who read translated documentation often cross reference that with the original English documentation? They do this to familiarize themselves with English docs, and to avoid outdated or inaccurate translations, which is one caveat of internationalized documentations.

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Language toggle on Electron documentation"/>
</figure>

To make cross-referencing to English docs easier, we recently shipped a feature that allows you to seamlessly toggle a section of the Electron documentation between English and whatever language you're viewing the website in. The language toggle will show up as long as you have a non-English locale selected on the website.

## ⚡️ Quick Access to Translation Page

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="New Electron documentation footer in Japanese"/>
  <figcaption>Electron documentation footer in Japanese</figcaption>
</figure>

Notice a typo or an incorrect translation while you're reading the documentation? You no longer have to log in to Crowdin, pick your locale, find the file you'd like the fix, etc etc. Instead, you can just scroll down to the bottom of the said doc, and click "Translate this doc" (or the equivalent in your language). Voila! You are brought straight to the Crowdin translation page. Now apply your translation magic!

## 📈 Some Statistics

Ever since we have publicized the Electron documentation i18n effort, we have seen _huge_ growth in translation contributions from Electron community members from all around the world. To date, we have **1,719,029 strings translated, from 1,066 community translators, and in 25 languages**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Translation Forecast provided by Crowdin"/>
    <figcaption>Translation Forecast provided by Crowdin</figcaption>
  </a>
</figure>

Here is a fun graph showing the approximate amount of time needed to translate the project into each language if the existing tempo (based on the project activity during the last 14 days at the time of writing) is preserved.

## 📃 Translator Survey

We would like to give a huge ❤️ thank you ❤️ to everyone who has contributed their time to help improving Electron! In order to properly acknowledge the hard work of our translator community, we have created a survey to collect some information (namely the mapping between their Crowdin and Github usernames) about our translators.

If you are one of our incredible translators, please take a few minutes to fill this out: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Node's Internationalization Effort

Because of the success of Electron's i18n initiative, Node.js decided to model [their revamped i18n effort](https://github.com/nodejs/i18n) after the pattern we use as well! 🎉 The [Node.js i18n initiative](https://github.com/nodejs/i18n) has now been launched and gained great momentum, but you can stil read about the early proposal and reasoning behind it [here](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Contributing Guide

If you're interested in joining our effort to make Electron more international friendly, we have a handy-dandy [contributing guide](https://github.com/electron/i18n/blob/master/contributing.md) to help you get started. Happy internationalizing! 📚
