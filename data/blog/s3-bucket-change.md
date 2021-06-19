---
title: "S3 Bucket Migration"
author: MarshallOfSound
date: '2020-08-01'
---

Electron is changing its primary S3 bucket, you may need to update your build scripts

---

# What is happening?

Currently a significant amount of Electrons build artifacts are uploaded to an S3 bucket called `gh-contractor-zcbenz`, as part of ongoing infrastructure / ownership migrations we will be changing everything that used `gh-contractor-zcbenz` to a new bucket called `electronjs-artifacts`.  The bucket prefix that most of our assets use is changing slightly as well.  Examples are included below:

**Before:** https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist/v1.0.0/electron-darwin-x64.zip
**After:** https://electronjs-artifacts.s3.amazonaws.com/dist/v1.0.0/electron-darwin-x64.zip

The important things here are the **Bucket Name** changed and the `/dist` **prefix** was removed.  Another example, this time for debug symbols:

**Before:** https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/symbols/path/to/symbol.pdb
**After:** https://electronjs-artifacts.s3.amazonaws.com/symbols/path/to/symbol.pdb

Again, the bucket name changed and the `/dist` prefix was removed.

# How might this impact you?

For anyone using standard build tooling such as `electron-rebuild`, `electron-packager` or `@electron/get` you won't have to do anything, this should be the majority of people.

For anyone directly referencing the S3 bucket you update your reference to point at the new bucket and update the prefix as well.

# What about existing data?

All data that existed on the `gh-contractor-zcbenz` bucket has been cloned onto the `electronjs-artifacts` bucket. This means all symbols, headers, build artifacts, etc. all exist on the new bucket.

The current `gh-contractor-zcbenz` bucket will not be actively deleted however we can't guarantee how long that bucket will be left alive.  We **strongly** reccomend updating to target the new bucket as soon as possible.


