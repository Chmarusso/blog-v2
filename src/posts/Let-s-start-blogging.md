---
title: Let's start blogging
date: 2016-10-29 10:52:00
tags:
- hexo
- node.js
- js
intro: If you want to start blogging and you are scared of monsters like Wordpress this post is for you. Inside you can find introduction to Hexo - blazing fast blog framework written in Node.js
cover: /images/lets-start.jpg
---
I always wanted to have my own technical blog. As an IT guy I started from searching for a proper tool that will help me in my everyday (hope so) blogging.
In order to choose proper tool wisely we need to have clear requirements and
expectations of what we want to achieve. I knew from the beginning that my blog must be simple and easy to deploy. I do not want to have huge administration panel with hundreds of features that I would never use. Having that in mind, I did short research and I decided to go with [Hexo](https://hexo.io/) - blazing fast blog framework written in Node.js. You might be suprised or not, but post you are reading right now was generated using that tool.

### Hello world in Hexo
To start blogging using Hexo we need to install Node.js and Git. Once we have them installed we can install Hexo in our system:
``` bash
npm install -g hexo-cli
```

When installation is done we can initialize our first blog:
``` bash
hexo init <folder>
cd <folder>
npm install
```

Now let's generate static files, run server and check if everything is working:
``` bash
cd <folder>
hexo generate
hexo server
```

My Hexo server started properly and blog is working. Thing is default configuration not suits me. Let's fix that. Basic configuration might be changed in `_config.yml`:
``` yml
# _config.yml
title: Artur Chmaro
subtitle: Szczecin, Poland.
description: >
  Full Stack Developer @ Consileon Poland.
  My favorite tools are Ruby and JavaScript.
author: Artur Chmaro
language: en
timezone: Europe/Warsaw
```

Default theme in my opinion is not perfect, but fortunately Hexo offers us bunch of really nice [themes](https://hexo.io/themes/) built by awesome community. Once you picked something from list just download and extract it into `themes` directory. Do not forget to tell Hexo in configuration file which theme you want to use:
``` yml
# _config.yml
theme: flexy
```

After each change of theme remember about re-creating all files and restarting the server (Ctrl+C):
``` bash
hexo generate
hexo server
```

After refreshing browser blog looks way more better. Now it is time for the hardest part: writing posts.

### First post
By default Hexo does not offer administration panel and all posts are generated through command line. That means that content of posts needs to be formatted by using text formatting syntax. Hexo let us change the markup using Markdown syntax. If you are not familiar with Markdown you can play with it [here](http://dillinger.io/) and surely you will grasp some basics. If it is not enough for you should definitely check [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). Enough theory. Let's add our first post:
``` bash
hexo new "Let's start blogging"
```

Above command created `source/_posts/Let-s-start-blogging.md` file. We can modify it a bit:
``` yml
---
title: Let's start blogging
date: 2016-10-29 10:52:00
tags: hexo node.js js
---
I always wanted to have my own technical blog.
```
Now we need to re-create files, restart server and our first post is finally published. The only problem is, that nobody can read our blog and give us feedback that we did really great job. Good blogs usually are published on publicly accessible servers, so everyone with Internet access can read them. Our blog is good, so that means that now it is a deployment time.

### Deploy blog to your production server  

Hexo offers various ways of deployment. We can publish blog on Github, deploy straight to cloud services (Heroku/S3), Rsync with server or just send files over FTP. For testing purposes I decided to go with the simplest approach and publish my blog using FTP. To do that we need FTP deploy plugin:
``` bash
npm install hexo-deployer-ftpsync --save
```

Last step is to tell Hexo where we want to deploy:
``` yml
# _config.yml
deploy:
  type: ftpsync
  host: example.com
  user: john_doe
  pass: YOUR_PASSWORD
  remote: /public_html/blog
  port: 21
  connections: 1
  verbose: false
```

To avoid problems with routing and styling make sure that you specified correct root and url:
``` yml
# _config.yml
url: http://example.com
root: /blog/
```

When configuration is ready we can finally deploy code:
``` bash
hexo deploy
```

We know how to write and publish posts on our blog - so far, so good. How about adding some comments? When nobody can comment on our posts it is hard to receive instant feedback. We need to fix this now.

## Comment system

Hexo keeps things very simple, so by default we do not have feature that allows to comment our posts. That is fine, because we can add such feature by using [Disqus](https://disqus.com) very easily. We need create account have and set `disqus_shortname` at configuration file:
``` yml
# _config.yml
disqus_shortname: arturchmaro
```

From now on our blog is ready for tough discussions. In order to test it locally just change blog url to `http://localhost:xxxx` . Where `xxxx` is a port used by your server (4000 by default).
