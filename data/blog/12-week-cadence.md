---
title: New Electron Release Cadence
author: sofianguy
date: '2019-05-13'
---

🎉 Electron is moving to release a new major stable version every 12 weeks! 🎉

---

## ⚡️ Wow that's quick! But why?

Simply put, Chromium doesn't stop shipping so Electron is not going to slow down either.

Chromium releases on a consistent 6-week [schedule](https://www.chromium.org/developers/calendar). To deliver the most up-to-date versions of Chromium in Electron, our schedule needs to track theirs. More information around Chromium's release cycle can be found [here](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 Why every 12 weeks?

Every 6 weeks, a new Chromium release comes out with new features, bug fixes / security fixes, and V8 improvements. Electron's users have been loud and clear about wanting these changes in a timely manner, so we've adjusted our stable release dates to match every other Chromium stable release. Up first, Electron v6.0.0 will include M76 and is scheduled for stable release on [July 30, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), the same release day as [Chromium M76](https://www.chromestatus.com/features/schedule).

## 🚧 What does this mean for me and my Electron app?

You'll have access to new Chromium and V8 features and fixes sooner than before. Importantly, you'll also know _when_ those new changes are coming, so you'll be able to plan with better information than before.

The Electron team will [continue to support](https://electronjs.org/docs/tutorial/support#supported-versions) the latest three major versions. For example, when [v6.0.0 goes stable on July 30, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), we will support v6.x, v5.x, and v4.x, while v3.x will reach End-Of-Life.

## 💬 App Feedback Program

Please consider joining our [App Feedback Program](https://electronjs.org/blog/app-feedback-program) to help us with testing our beta releases and stabilization. Projects who participate in this program test Electron betas on their apps; and in return, the new bugs they find are prioritized for the stable release.

## 📝 A brief history of Electron releases

The decisions around stable releases before v3.0.0 did not follow a schedule. We added internal schedules to the project with v3.0.0 and v4.0.0. Earlier this year, we decided to publicize our stable release date for the first time for [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Announcing our stable release dates was positively received overall and we're excited to continue doing that for future releases.

In order to better streamline these upgrade-related efforts, our [Upgrades](https://github.com/electron/governance/tree/master/wg-upgrades) and [Releases](https://github.com/electron/governance/tree/master/wg-releases) Working Groups were created within our [Governance](https://electronjs.org/blog/governance) system. They have allowed us to better prioritize and delegate this work, which we hope will become more apparent with each subsequent release.

Here is where our new cadence will put us in comparison to Chromium's cadence:
<img alt="line graph comparing Electron versus Chromium versions" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png"/>

📨 If you have questions, please mail us at [info@electronjs.org](mailto:info@electronjs.org).
