---
title: WebChatter - my first open source project
date: 2017-03-03 17:11:33
tags:
- dajsiepoznac2017
- getnoticed
- motivation
intro: WebChatter is a live chat app written in Ruby on Rails and React.
cover: /images/web-chatter.jpg
---
As I wrote on previous post, I’m participating in Get Noticed contest. The purpose of this contest is to create open source project and blog about it. I came up with idea that I want to create live chat widget that can be easily embedded on any webpage.

I know that developing live chat widget may be little too much for the beginning, but I’m excited about this idea and I hope that this excitement will drive me into right direction.  

### What stack?
Backend for this app will be based on Rails 5. On the client side I want to use some kick-ass JS tools like React, Redux, ActionCable, Webpack and maybe something else (as you may know, every day brings something new and interesting to JS world so I don’t want to limit myself too much in that matter).

### What WebChatter will actually do?
I want to have two actors of WebChatter system: operator and customer. Customer is an individual using the website where live chat widget is embedded. Operator is someone who talks with customers that are using the widget. To simplify things I want to have just one operator per website.

WebChatter code base is hosted on github and you can find it here: [https://github.com/Chmarusso/web_chatter](https://github.com/Chmarusso/web_chatter)

Right now it is just a standard Rails 5 project with React + Webpack setup. In my next post I will tell little more about the configuration and why I decided to use `react_on_rails` gem. Thanks for reading and stay tuned!
