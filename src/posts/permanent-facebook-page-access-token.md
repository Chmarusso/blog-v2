---
title: Permanent Facebook page access token
date: 2017-04-08 17:58:36
tags:
- opengraph
- facebook
- dajsiepoznac2017
- getnoticed
intro: If your app is interacting with Facebook pages you probably need a permanent access token.
cover: /images/fb-permanent-token.jpg
---
One of my websites has integration with Facebook. By integration, I mean that each single post submitted to the database is automatically published to the Facebook page. In order to publish anything on FB page using API, you need to have a valid access token. Facebook documentation is pretty straightforward on that topic and you should not have any troubles with obtaining the token. Problem is that those tokens are valid for 3 months which for me is not enough. Let's find out how we can generate a permanent and non-expiring token.

First of all, we need a Facebook account and app. Once you have them go to [Api Explorer](https://developers.facebook.com/tools/explorer/) and choose your app from upper right corner select box. Next click `Get Token` and `Get User Access Token` and check `manage_pages` option.

<blockquote class="imgur-embed-pub" lang="en" data-id="FFLkJll"><a href="//imgur.com/FFLkJll">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Now you need to visit following URL:
```
https://graph.facebook.com/v2.8/oauth/access_token?grant_type=fb_exchange_token&client_id={app_id}&client_secret={app_secret}&fb_exchange_token={token_from_previous_step}
```

If everything went fine you should get a response with the access token. Copy this access token, paste it to Graph Explorer and access `/me/accounts` resource. Now you can copy access token from your page entity.

<blockquote class="imgur-embed-pub" lang="en" data-id="R47Lxd7"><a href="//imgur.com/R47Lxd7">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Finally, you can check your final access token in the Access Token Debug tool. It should be a permanent token without an expiry date.

<blockquote class="imgur-embed-pub" lang="en" data-id="UgAoFik"><a href="//imgur.com/UgAoFik">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
