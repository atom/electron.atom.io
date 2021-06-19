---
title: Mac App Store and Windows Auto Updater on Electron
author: jlord
date: '2015-11-05'
---

Recently Electron added two exciting features: a Mac App Store compatible build and a built-in Windows auto updater.

---

## Mac App Store Support

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300"/>

As of `v0.34.0` each Electron release includes a build compatible with the Mac App Store. Previously an application built on Electron would not comply with Apple's requirements for the Mac App Store. Most of these requirements are related to the use of private APIs. In order to sandbox Electron in such a way that it complies with the requirements two modules needed to be removed:

- `crash-reporter`
- `auto-updater`

Additionally some behaviors have changed with respect to detecting DNS changes, video capture and accessibility features. You can read more about the changes and [submitting your app to the Mac App store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) in the documentation. The distributions can be found on the [Electron releases page](https://github.com/electron/electron/releases), prefixed with `mas-`.

Related Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Windows Auto Updater

In Electron `v0.34.1` the `auto-updater` module was improved in order to work with [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). This means that Electron ships with easy ways for auto updating your app on both OS X and Windows. You can read more on [setting up your app for auto updating on Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) in the documentation.

Related Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)
