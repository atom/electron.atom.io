---
title: WebView2 and Electron
author:
- electron
date: '2021-07-08'
---

Over the past week, we’ve received several questions about the differences between the new [WebView2](https://docs.microsoft.com/en-us/microsoft-edge/webview2/) and Electron.
We want to provide some early information on the similarities and differences of the two solutions.

---

## Architecture Overview

Electron and WebView2 both build from the Chromium source for rendering web content.
Strictly speaking WebView2 builds from the Edge source, but Edge is built using a fork of the Chromium source.
Neither Electron nor WebView2 share any DLLs files on the system with Edge or Chrome.

Electron apps always bundle and distribute the exact version of Electron with which they were developed.
WebView2 has two options in distribution.
You can bundle the exact WebView2 library your application was developed with, or you can use a shared-runtime version that may already be present on the system.
WebView2 provides tools for each approach, including a bootstrapping installer in case the shared runtime is missing.

Applications that bundle their frameworks are responsible for updating those frameworks, including minor security releases. 
For apps using the shared WebView2 runtime, WebView2 has its own updater, similar to Chrome or Edge, that runs independent of your application. 
Your app will transparently inherit any updates every time it launches.
Neither Electron nor WebView2 is managed by Windows Update.

Both Electron and WebView2 inherit Chromium’s multi-process architecture - namely, a single main process that communicates with one-or-more renderer processes.
These processes are entirely separate from other applications running on the system.
Whether you run multiple Electron apps or multiple WebView2 apps, each application will contain a whole copy of the following process architectures:

* ElectronJS Process Model: 
    
    ![ElectronJS Process Model Diagram](/images/Electron-Architecture.png)
* WebView2 Based Application Process Model: 

    ![WebView2 Process Model Diagram](/images/WebView2-Architecture.png)

Read more about [WebView2’s process model](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/process-model#:~:text=WebView2%20uses%20the%20same%20process%20model%20as%20the,other%20utility%20processes%20as%20described%20in%20that%20article.) and [Electron’s process model](https://www.electronjs.org/docs/tutorial/process-model#:~:text=Process%20Model%20Electron%20inherits%20its%20multi-process%20architecture%20from,applied%20in%20the%20minimal%20quick%20start%20app%20.) here.

Electron provides APIs for common desktop application needs such as menus, file system access, notifications, and more. 
WebView2 is a component meant to be integrated into an application framework such as WinForms, WPF, or Win32. 
WebView2 does not provide operating system APIs outside the web standard via JavaScript.

Node.js is integrated into Electron.
Electron applications may use any Node.js API, module, or node-native-addon from the render and browser processes.
A WebView2 application does not assume which language or framework the rest of your application is written in.
There are C++ and C# templates available, but in each case your JavaScript code must proxy any operating system access through the application-host process.

Electron strives to maintain compatibility with the web API, including APIs developed from the [Fugu Project](https://fugu-tracker.web.app/).
We have a [snapshot of Electron’s Fugu API compatibility](https://docs.google.com/spreadsheets/d/1APQalp8HCa-lXVOqyul369G-wjM2RcojMujgi67YaoE/edit?usp=sharing).
WebView2 maintains a similar list of [API differences from Edge](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browser-features).

Electron has a configurable security model for web content, from full-access to full-sandbox.
WebView2 content is always sandboxed.
Electron has [comprehensive security documentation](https://www.electronjs.org/docs/tutorial/security) on choosing your security model.
WebView2 also has [security best practices](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/security).

The Electron source is maintained and available on GitHub.
Applications can modify can build their own _brands_ of Electron.
The WebView2 source is not available on GitHub.

Quick Summary:

|                                           | Electron        | WebView2                     |
| ----------------------------------------- | --------------: | ---------------------------: |
| Build Dependency                          | Chromium        | Edge                         |
| Source Available on GitHub                | Yes             | No                           |
| Shares Edge/Chrome DLLs                   | No              | No                           |
| Shared Runtime Between Applications       | No              | Optional                     |
| Application APIs                          | Yes             | No                           |
| Node.js                                   | Yes             | No                           |
| Sandbox                                   | Optional        | Always                       |
| Requires a Separate Application Framework | No              | Yes                          |
| Supported Platforms                       | Mac, Win, Linux | Win (Mac on roadmap)         |

## Performance Discussion

Now the big question:
_Will your app use 50% less memory by switching between one embedding of Chromium and another?_
Unfortunately not, but that would have been rad.

We created the [scaffolding to compare some simple apps built using Electron, WPF+WebView2, and .NET+WebView2](https://github.com/crossplatform-dev/xplat-challenges/blob/main/results.md). 
Our goal was to find any egregious differences, rather than deep-dive on micro-benchmarks.
The source code, and detailed results are available in the [xplat-challenges](https://github.com/crossplatform-dev/xplat-challenges) repository, 
so you’re free to play around with the frameworks yourself.

Here are the preliminary results.
Please check the repository for updates.

1. Startup and memory time

    | Technology       | Time |
    | ---------------- | ---: |
    | Electron         |   ~4s|
    | WebView2 + NET5 + WPF (C#) |   ~3s|
    | WebView2 + Win32 (C++)     |   ~2s|
1. Processes Count and Memory

    | Technology | # Processes | Total private bytes | Total working set |
    | ---        |        ---: |                ---: |              ---: |
    | Electron   |           4 |             78,940K |          226,396K |
    | WebView2 + NET5 + WPF (C#) |           7 |             77,748K |          268,248K |
    | WebView2 + Win32 (C++)     |           7 |            102,840K |          307,156K |
1. Write and Read 10,000 4k Files:

    |          | Write files | Read dir | Sequential Read | Concurrent Read |
    | ---------|------------:|---------:|----------------:|----------------:|
    | Electron |     6,218 ms |     21 ms |         8,751 ms |         1,059 ms |
    | WebView2 + NET5 + WPF (C#) |    10,585 ms |     82 ms |        13,470 ms |         5,936 ms |
    | NET5 + WPF (C# w/o WebView2) |     4,101 ms |      4 ms |         1,848 ms |           448 ms |
1. Write and Read 10,000 1MB Files:

    |          | Write files | Read dir | Sequential Read | Concurrent Read |
    | ---------|------------:|---------:|----------------:|----------------:|
    | Electron |    29,215 ms |     34 ms |        17,518 ms |         4,602 ms |
    | WebView2 + NET5 + WPF (C#) |    43,250 ms |     98 ms |        86,222 ms |        35,753 ms |
    | NET5 + WPF (C# w/o WebView2)  |    25,729 ms |      6 ms |        29,536 ms |         3,417 ms |
1. Sequental IPC Round Trip

    |                              | 1,000 / avg | 10,000 / avg |
    |------------------------------|------------:|-------------:|
    | Electron (context isolation) | 211.9 ms / 0.21 ms | 2,400 ms / 0.24 ms |
    | Electron (node integration)  | 165.8 ms / 0.16 ms | 1,316 ms / 0.13 ms |
    | WebView2 + NET5 + WPF (C#)   | 612.6ms / 0.61ms | 6,075ms / 0.61ms |
    | WebView2 + Win32 (C++)       |   529ms / 0.53ms | 5,141ms / 0.51ms |
1. Parallel Burst IPC Round Trip

    |                              | 1,000 / avg | 10,000 / avg |
    | -----------------------------|------------:|-------------:|
    | Electron (context isolation) | 414 ms / 229.8 ms | 2,021 ms /  949.4 ms  |
    | Electron (node integration)  | 138 ms /  68.1 ms | 1,349 ms /  627.5 ms  |
    | WebView2 + NET5 + WPF (C#)   | 604ms / 332.5ms | 5,408ms / 2,713.8ms |
    | WebView2 + Win32 (C++)       | 497ms / 258.3ms | 3,832ms / 2,157.5ms |
    | WebView2 (C++)                    | 497 ms / 258.3 ms | 3,832 ms / 2,157.5 ms |

### A Note About IPC

In Chromium the browser process acts as an IPC broker between sandboxed renderers and the rest of the system.
While Electron allows unsandboxed render processes, many apps choose to enable the sandbox for added security.
WebView2 always has the sandbox enabled, so for most Electron and WebView2 apps IPC can heavily impact overall performance.

Even though Electron and WebView2 have a similar process models, their underlying IPC implementation is different.
Communicating between JavaScript and C++ or C# requires [marshalling](https://en.wikipedia.org/wiki/Marshalling_(computer_science)),
most commonly into a JSON string. This is an expensive operation and IPC bottlenecks can negatively impact performance.

When sending JavaScript objects between Electron's main and renderer process,
Electron will use [the structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) which is [significantly faster](https://github.com/crossplatform-dev/xplat-challenges/blob/main/results.md#ipc) even when using context isolation for increased security.
Electron also supports direct IPC between any two processes via the [MessagePorts](https://www.electronjs.org/docs/latest/performance/message-ports/) API,
which also utilizes structured clone.
Applications which leverage this can avoid paying the JSON-serialization tax when sending objects between processes.

## Summary

Electron and WebView2 have a number of differences, but don't expect much difference with respect to how they perform rendering web content.
Ultimately an app’s architecture and JavaScript libraries/frameworks have a larger impact on memory and performance than anything else because _Chromium is Chromium_ regardless of where it is running.
