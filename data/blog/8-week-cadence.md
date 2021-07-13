---
title: New Electron Release Cadence
author: VerteDinde
date: '2021-07-14'
---

Beginning in September 2021, Electron will release a new major stable version every 8 weeks.

---

In 2019, Electron moved to a 12 week release cycle to match Chromium's 6 week release cycle. Recently, both Chrome and Microsoft announced changes that made us re-consider Electron's current release cadence:

1. Chromium plans to [release a new milestone every **4 weeks**, starting with Chrome 94 on September 21st, 2021.](https://developer.chrome.com/blog/faster-release-cycle/) This release cadence also adds a new Extended Stable option every 8 weeks, which will contain all updated security fixes.

2. The Microsoft Store will [require Chromium-based apps to be no older than within 2 major versions](https://docs.microsoft.com/en-us/windows/uwp/publish/store-policies#102-security) (for example, if the latest released major version of Chromium is 85, any browser based on Chromium must be on at least Chromium version 83 or higher). This rule includes Electron apps.

**Beginning in September 2021, Electron will release a new major stable version every 8 weeks**, to match Chromium's 8 week Extended Stable releases.

Our first release with Chromium Extended Stable will be **Electron 15** on **September 21st, 2021**.

Knowing the a release cadence change will impact other downstream applications, we wanted to let our developer community know as soon as possible. Read on for more details about our 2021 release schedule.

## Moving to Extended Stable

Given that our original Electron 15 release targeted a non-Extended Stable version (Chromium's Extended Stable versions are based on their even-numbered versions), we needed to change our original target release date. However, an Electron app must use the most recent 2 major versions of Chromium to be accepted to the Microsoft Store. With these two requirements, our Releases WG faced a timing dilemma. 

Below is the planned release schedule for 2021:

| Electron | Chrome | Release | Beta to Stable (Weeks) |
| -------- | ------ | ------- | ----- |
| E13 | M91 | 2021-May-25 |  12  |
| E14 | M93 | 2021-Aug-31 |  14  |
| E15 | M94 | 2021-Sep-21 |  3  |
| E16 | M96 | 2021-Nov-16 |  8  |
| E17 | M98 | 2022-Feb-01 |  11  |

Moving Electron 15 to include Chromium M94 would allow app developers to get on the very first Extended Stable version of Chromium - however, it would also shorten the beta-to-stable cycle to only 3 weeks. Yikes!

We've received feedback from the community in the past that our release cycle was already aggressive, and we didn't want to put developers in a position where they felt they weren't given enough time to update their Electron versions.

## Electron 15: Temporary Alpha

To help with this switchover, Electron will offer a temporary **alpha build**, only for the Electron 15 release. This alpha build will allow developers more time to test and plan for an Electron 15 release, with a more stable build than our current nightlies.

The alpha channel build will ship for **Electron 15** on **July 20th, 2021**. It will transition to a beta release on **September 1st, 2021**  with a stable release target of **September 21st, 2021**. With each subsequent Electron release, alphas will be released alongside beta releases for their respective versions.

## 2021 Plan for Releases

Below is our current release schedule for 2021:

| Electron | Chrome | Alpha Release | Beta Release | Stable Release | Stable Cycle (Weeks) |
| -------- | ------ | ----- | ---- | ------ | -------- |
| E13 | M91 | -          | 2021-Mar-05 | 2021-May-25 | 12 |
| E14 | M93 | -          | 2021-May-26 | 2021-Aug-31 | 14 |
| E15 | M94 | 2021-Jul-20 | 2021-Sep-01 | 2021-Sep-21 | 9 (includes alpha) |
| E16 | M96 |  - | 2021-Sep-22 | 2021-Nov-16 | 8 |
| E17 | M98 |  - | 2021-Nov-17 | 2022-Feb-01 | 11 |

Adding the alpha channel extends the development time before Electron 15's launch from 3 weeks to 9 weeks - closer to our new 8 week cycle, while still meeting the requirements for Windows Store submission.

To further help app developers, **for the remainder of 2021, we will also be extending our supported versions policy from the latest 3 versions to the latest 4 versions of Electron.** That means that even if you can't immediately alter your upgrade schedule, older versions of Electron will still receive security updates and fixes.

## Addressing Concerns 

There's a reason we're publishing this post well before this release cycle change is scheduled. We know that a faster release cycle will have a real impact on Electron apps - some of which may already find our major release cadence aggressive.

We've tried to address common concerns below:

#### ❓ Why even make this change? Why not keep the 12 week release cadence?

To deliver the most up-to-date versions of Chromium in Electron, our schedule needs to track theirs. More information around Chromium's release cycle can be found [here](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

Every new Chromium release contains new features, bug fixes / security fixes, and V8 improvements. We want you, as app developers, to have these changes in a timely manner, so our stable release dates will continue to match every other Chromium stable release. As an app developer, you'll have access to new Chromium and V8 features and fixes sooner than before.

#### ❓ The existing 12 week release schedule already moves quickly. What steps are the team taking to make upgrading easier?

One plus of more frequent releases is having _smaller_ releases. We understand that upgrading Electron's major versions can be difficult; we hope that, by releasing more frequently, we can introduce fewer major Chromium and Node changes, as well as fewer breaking changes, per release.

#### ❓ Will Electron extend the number of supported versions?

For the remainder of 2021, we will also be extending our supported version policy from the latest three versions to the latest four versions of Electron. When the 8 week cadence begins in 2022, we'll continue to [support the latest three major versions](https://www.electronjs.org/docs/tutorial/support#supported-versions), as well as the beta, alpha and nightly release.


## Questions?

📨 If you have questions or concerns, please mail us at [info@electronjs.org](mailto:info@electronjs.org) or [join our Discord](https://discord.com/invite/electron). We know this is a change that will impact many apps and developers, and your feedback is very important to us. We want to hear from you!
