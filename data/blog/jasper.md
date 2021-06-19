---
title: 'Project of the Week: Jasper'
author: 
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

This week we interviewed the creator of [Jasper], an Electron-based tool for
managing GitHub notifications.

---

## Hello! Who are you?

I'm [Ryo Maruyama](https://github.com/h13i32maru), a software developer in Japan. I am developing [Jasper](https://jasperapp.io) and [ESDoc](https://esdoc.org).

## What is Jasper?

[Jasper] is a flexible and powerful issue reader for GitHub. It supports issues and pull requests on github.com and GitHub Enterprise.

[![Jasper App Screenshot](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Why did you make it?

When people use GitHub in their job or OSS activities, they tend to receive many notifications on a daily basis. As a way to subscribe to the notifications, GitHub provides email and [web notifications](https://github.com/notifications). I used these for a couple of years, but I faced the following problems:

- It's easy to overlook issues where I was mentioned, I commented, or I am watching.
- I put some issues in a corner of my head to check later, but I sometimes forget about them.
- To not forget issues, I keep many tabs open in my browser.
- It's hard to check all issues that are related to me.
- It's hard to grasp all of my team's activity.

I was spending a lot of time and energy trying to prevent those problems, so I decided to make an issue reader for GitHub to solve these problems efficiently, and started developing Jasper.

## Who's using Jasper?

Jasper is used by developers, designers, and managers in several companies that are using GitHub.
Of course, some OSS developers also are using it.
And it is also used by some people at GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"/></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"/></a>

## How does Jasper work?

Once Jasper is configured, the following screen appears. From left to right, you can see "streams list", "issues list" and "issue body".

[![Jasper Start Screen](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

This "stream" is the core feature of Jasper. For example, if you want to see "issues that are assigned to @zeke in the electron/electron repository", you create the following stream:

```
repo:electron/electron assignee:zeke is:issue
```

[![Jasper Start Screen 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

After creating the stream and waiting for a few seconds, you can see the issues that meet the conditions.

[![Jasper Start Screen 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## What can we do with streams?

I will introduce what kind of conditions can be used for stream.

### Users and Teams

| Stream | Issues |
| ---- | --- |
| `mentions:cat mentions:dog` | Issues that mention user `cat` or `dog`|
| `author:cat author:dog` | Issues created by user `cat` or `dog` |
| `assignee:cat assignee:dog` | Issues assigned to `cat` or `dog` |
| `commenter:cat commenter:dog` | Issues that `cat` or `dog` commented on |
| `involves:cat involves:dog` | Issues that "involve" `cat` or `bob` |
| `team:animal/white-cat team:animal/black-dog` | Issues that `animal/white-cat` or `animal/black-dog` are mentioned in |

`involves` means `mention`, `author`, `assignee` or `commenter`

### Repositories and Organizations

| Stream | Issues |
| --- | --- |
| `repo:cat/jump repo:dog/run` | Issues in `cat/jump` or `dog/run` |
| `org:electron user:cat user:dog` | Issues in `electron`, `cat` or `dog` |

`org` is same as `user`

### Attributes

| Stream | Issues |
| --- | --- |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Issues that are attached to `v1.0.0` or `v1.0.1` in `cat/jump` |
| `repo:cat/jump label:bug label:blocker` | Issues that are attached `bug` **and** `blocker` in `cat/jump` |
| `electron OR atomshell` | Issues that include `electron` or `atomshell` |

### Review Status

| Stream | Issues |
| --- | --- |
| `is:pr review:required` | Issues that are required review in `cat/jump` |
| `is:pr review-requested:cat` | Issues that are requested review by `cat`. <br/> But these are not reviewed yet. |
| `is:pr reviewed-by:cat` | Issues that are reviewed by `cat` |

<br/>

As you may have noticed by looking at these, streams can use GitHub's search queries.
For details on how to use streams and search queries, see the following URLs.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper also has features for unread issue management, unread comment management, marking stars, notification updating, filtering issues, keyboard shortcuts, etc.

## Is Jasper a paid product? How much does it cost?

Jasper is $12. However you can use the [free trial edition](https://jasperapp.io/) for 30 days.

## Why did you choose to build Jasper on Electron?

I like the following aspects of Electron:

- Apps can be developed with JavaScript/CSS/HTML.
- Apps can be built for Windows, Mac, and Linux platforms.
- Electron is actively developed and has a large community.

These features enable rapid and simple desktop application development. It is awesome! If you have any product idea, you should consider using Electron by all means.

## What are some challenges you've faced while developing Jasper?

I had a hard time figuring out the "stream" concept. At first I considered using GitHub's [Notifications API]. However I noticed that it does not support certain use cases. After that I considered using the [Issues API] and [Pull Requests API], in addition to the Notification API. But it never became what I wanted. Then while thinking about various methods, I realized that polling GitHub's [Search API] would offer the most flexibility. It took about a month of experimentation to get to this point, then I implemented a prototype of Jasper with the stream concept in two days.

Note: The polling is limited to once every 10 seconds at most. This is acceptable enough for the restriction of GitHub API.

## What's coming next?

I have a plan to develop the following features:

- **A filtered stream**: A stream has some filtered stream that filter issues in the stream. It is like as view of SQL.
- **Multiple accounts**: you will be able to use both github.com and GHE
- **Improve performance**: For now the loading a issue in WebView is low speed than normal browser.

Follow [@jasperappio](https://twitter.com/jasperappio) on Twitter for updates.

[Jasper]: https://jasperapp.io
[Notifications API]: https://developer.github.com/v3/activity/notifications/
[Pull Requests API]: https://developer.github.com/v3/pulls/
[Issues API]: https://developer.github.com/v3/issues/
[Search API]: https://developer.github.com/v3/search/
