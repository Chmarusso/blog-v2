---
title: React Native and Android on OS X
date: 2018-01-06 14:02:29
tags:
- react
- react-native
- javascript
- js
- android
intro: In this article, I will show you how to start developing Android apps on your Mac.
cover: /images/react-native-android.jpg
---
Setting up React Native to work with a simulator for iOS apps on Mac is working almost out of the box. However, the configuration of Android simulator is a bit tricky. I followed official tutorials, but for some reason, my simulator was not working. In this article, I will guide you how I started developing Android apps on my Mac. I hope this post will be helpful for React Native rookies and save some of their time.

To start developing Android at OSX, we need to do couple things:

1. Install Android Studio and JDK for Mac
2. Configure paths in our system
3. Install missing packages at Android Studio
4. Configure and run Android Virtual Device
5. Build React Native app for Android device

Sounds like a lot of work, but fortunately it's not as bad as you may think. Enough talk, let's go!

### Download and install Android Studio
Go to the official website and grab [installation package](https://developer.android.com/studio/index.html). Once you got it extract files start "Custom" installation. Make sure you have checked:
- Android SDK,
- Android SDK Platform,
- Performance (Intel HAXM),
- Android Virtual Device

Some of packages could be unavailable but do not worry about it as we can install them through Android Studio app afterward.

### Download and install JDK for Mac
Go to the [official website](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and grab installation package:
<blockquote class="imgur-embed-pub" lang="en" data-id="YgWHmIR"><a href="//imgur.com/YgWHmIR">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Extract the archive file and install JDK.
Update: Be careful with Java 10 (try Java 8), some people have troubles with this version.

### Configure paths in our system
Using your favorite text editor append the following lines to your `~/.bash_profile` config file:
```
# Android SDK
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
```

### Install missing packages at Android Studio
Run Android Studio and go to the SDK Manager:
<blockquote class="imgur-embed-pub" lang="en" data-id="agdWi7t"><a href="//imgur.com/agdWi7t">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Make sure you picked and installed Android API and desired versions of Android system you wish to use during development:
<blockquote class="imgur-embed-pub" lang="en" data-id="fdNnoET"><a href="//imgur.com/fdNnoET">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Then switch to SDK tools tab and check Android SDK Build-Tools, Android SDK Platform-Tools, Android SDK tools, Google Play services and Support repositories:
<blockquote class="imgur-embed-pub" lang="en" data-id="fTOYE6F"><a href="//imgur.com/fTOYE6F">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Configure and run Android Virtual Device
Now we need to start a new Android Studio project. In the dialog choose Android API version and wait for project success build:
<blockquote class="imgur-embed-pub" lang="en" data-id="lbEvXOe"><a href="//imgur.com/lbEvXOe">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Once build process finished check if there are any TODO actions (Gradle may inform you about some missing elements that you have to install).
<blockquote class="imgur-embed-pub" lang="en" data-id="qg5Sf0I"><a href="//imgur.com/qg5Sf0I">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

If everything went fine now, it is a time for setting up Android Virtual Device which is necessary for our React Native development. Launch our device simulator and create new device:
<blockquote class="imgur-embed-pub" lang="en" data-id="c4x7kW1"><a href="//imgur.com/c4x7kW1">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Once the virtual device is created, launch it and keep it open for whole React Native development process:
<blockquote class="imgur-embed-pub" lang="en" data-id="qcOXACD"><a href="//imgur.com/qcOXACD">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Build React Native app for Android device
Finally, it's an exciting moment to check if everything went fine and our app might be executed on the Android simulator.

I created a simple project using [create-react-native-app](https://github.com/react-community/create-react-native-app) builder, so to run Android all I need to do is type following commands inside React Native project directory:
```
$ cd android && ./gradlew clean && cd .. && react-native run-android
```
<blockquote class="imgur-embed-pub" lang="en" data-id="L1Jrcpa"><a href="//imgur.com/L1Jrcpa">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Now we are all set, and nothing stops us from developing Android apps using React Native on OSX.

If you change your code, you may be wondering how to reload simulator. Go to your simulator and just hit `Command⌘ + M` combination. Consider enabling the very handy option: Live Reload. Each time you introduce change to your project simulator will reload and render updated UI.
<blockquote class="imgur-embed-pub" lang="en" data-id="7Galk6Q"><a href="//imgur.com/7Galk6Q">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Got troubles with setting everything up? Let me know in comments, and I will be happy to help you out.

