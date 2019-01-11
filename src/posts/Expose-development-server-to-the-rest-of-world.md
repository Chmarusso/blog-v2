---
title: Expose development server to the rest of world
date: 2017-10-08 22:29:12
tags:
- ngrok
- nodejs
- servers
intro: Learn how easily you can expose server from your development machine to other people without deploying code to the external server.
cover: /images/ngrok-expose.jpg
---
Learn how easily you can expose server from your development machine to other people without deploying code to the external server.

## Motivation

This weekend I started learning how to develop a Facebook messenger bots and at the very beginning, I've encountered one problem. Messenger needs to communicate with my app somehow. Basically, Facebook sends a web request to my bot each time somebody initiates conversation with it.  That means that in order to receive requests from Facebook I need to have a server that is waiting for calls at some port. My first thought to tackle this was deploying code to [Heroku](https://www.heroku.com/) or [Firebase](https://firebase.google.com/), but then I realized that it is not a good idea. Developing the first bot in such way will be very painful. After each change code should be deployed to the cloud. I'm new into developing Messenger bots so I'm pretty sure that I will be changing my code many times before having it working as I want. Each deploy to Heroku takes time and I don't want wait. The solution for it is very simple. I want to let Facebook communicate with my development machine.

## Secure tunnels to localhost
[ngrok](https://ngrok.com/) allows you to create a secure public URL (https://xxx.ngrok.io) to a local web server on your machine. Let's see how it works in action.

For test purposes, I've created a really simple web server using [express](https://expressjs.com/):

```javascript
// app.js
const express = require('express')
const app = express()

app.get('/call', function (req, res) {
  res.send('Hello World!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
```

```
$ node app.js
```

When the server is up and running, a request to `http://localhost:8080/call` should print `Hello world` text. We have the server, so now it is time for setting up `ngrok`.  Installation of `ngrok` is very simple and we can do it using `npm`:

```
$ npm install -g ngrok
```
Once the installation is complete we can tell ngrok to expose a web server at port 8080 to the internet:
```
$ ngrok http 8080
```
Now let's check if everything is working:
```
$ curl http://104c1ff4.ngrok.io/call
```
<blockquote class="imgur-embed-pub" lang="en" data-id="a/o0PLQ"><a href="//imgur.com/o0PLQ"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Looks like our development server is accessible from outside world. From now on we can focus on our work without thinking too much about deploying code to the cloud each time our code got changed.
