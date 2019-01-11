---
title: Convert IPB4 database to Discourse
date: 2018-03-17 12:14:06
tags:
- ruby
- discourse
- ipb
- docker
intro: My approach for converting Invision Power Board 4 database to Discourse.
cover: /images/ipb4-to-discourse.jpg
---
Discussion boards are not as popular as they used to be. I remember the times when my [IPB board](https://forum.mmorpg.org.pl) had 200-300 users online, and dozens of exciting topics published a day. Right now the trend is that people are moving to Facebook groups, Reddit, Discords, and other social platforms. As my board is not as popular as it used to be, I decided to switch from IPB to [Discourse](https://www.discourse.org/). I do not feel confident in Invision Power Board ecosystem as I'm not a PHP developer anymore. However, that is not the main reason why I've decided to give Discourse a chance.

## Why Discourse?

Discourse is a modern and fully open source platform for discussions (similar to Reddit). The significant advantage from my perspective is also a fact that Discourse is written in Ruby on Rails and EmberJS on the front. Additionally, deployment of Discourse thanks to Docker container is damn easy. Out of your command line, you can have PostgreSQL, Redis, Sidekiq, Nginx, SSL support and other goodies up and run in a matter of seconds. I think that guys from Discourse did a great job because setting up everything on your own would take you a lot of time.

Wanna to try it out? Get Docker:
```
$ wget -qO- https://get.docker.com/ | sh
```

Install Discourse:
```
$ mkdir ~/discourse
$ git clone https://github.com/discourse/discourse_docker.git ~/discourse
$ cd ~/discourse
$ ./discourse-setup
```


## Import your IPB4 board to Discourse

Currently moving from IPB4 to Discourse is not easy-peasy. There is no official converting tool and for most folks lack of it is a blocker. That is why I decided to write a tool for it.

My solution is not 100% ready, and for now, it only converts:
1. users (without avatars and passwords, each user has to reset the password before log-in)
2. forums as categories
3. topics and posts

If it does not discourage you in any way feel free to use my conversion script that you can find [here](https://gist.github.com/Chmarusso/0e5811dbc726cdcbc42d746c8db30860).

I highly do not recommend to perform conversion on production databases. I suggest you do conversion locally and afterward update your production database of Discourse.

Recommended steps for conversion:
1. Backup Discourse and IPB4 databases
2. Create a local database for your IPB4 and load your backup there
3. Copy my script to `your_discourse_dir/script/import_scripts/ipb4.rb`
4. Modify your local IPB4 database credentials (lines 15-21)
5. Start conversion by running `ruby your_discourse_dir/script/import_scripts/ipb4.rb`

## Is it possible to migrate from other boards?
Yes! Check out the list of currently supported systems [here](https://github.com/discourse/discourse/tree/master/script/import_scripts). The list consists the most popular scripts like: mybb, punbb, phpbb, vbulletin and more.


