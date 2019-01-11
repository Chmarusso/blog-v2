---
title: Background processing using Resque
date: 2017-04-30 20:22:57
tags:
- dajsiepoznac2017
- getnoticed
- ruby
- resque
- webchatter
intro: Today I added to my Webchatter app a very convenient gem for background processing called Resque.
cover: /images/resque-logo.png
---
Today I added to my Webchatter app [Resque](https://github.com/resque/resque) gem. Resque is a very convenient tool for background processing. It comes with nice UI which allows browsing completed tasks or review those that failed. Tasks are stored in Redis so everything is working blazing fast. 

If you want to add Resque to your existing app first you need to add two gems into your Gemfile: 
```ruby
gem 'resque'
gem 'resque-web', require: 'resque_web'
```

The second gem is not required, but in my opinion, it is really helpful for debugging purposes. When something is wrong with an asynchronous task you can simply check recently executed jobs from your browser and investigate why task failed. Then run `bundle install` and prepare your first Ruby class that will be executed asynchronusly (in the background):
```ruby
# app/workers/send_email_notification_worker.rb
class SendEmailNotificationWorker
  @queue = :emailing

  def self.perform(user_id)
    user = User.find(user_id)
    NewCustomerNotification.call(user_id)
  end
end
```

As you can see there is nothing special in that class except `@queue` instance variable and `self.perform` method. Those two things are required by Resque. `@queue` defines the name of the queue on which task will be executed and `perform` method is fired by Resque once the task is processed.  

Resque is using Redis for storing tasks data, so before we proceed to tests we need to make sure that Redis is up and running: 
```
$ redis-server
```

Now let's add a route to our app so we can gain access to Resque web UI:
```ruby
# config/routes.rb
mount ResqueWeb::Engine => "/resque_web"
```

Resque is working as a standalone system process, so before tests we need to start it:
```
$ cd app
$ bundle exec rake environment resque:work QUEUE=* 
```

Through rails console we can run our ruby class asynchronously in the following way: 
```ruby
Resque.enqueue(SendEmailNotificationWorker, 666)
```
Above command will invoke `perform` method with 666 param of `SendEmailNotificationWorker` class asynchronously. I do not have User with id 666, so the task should not be executed. Let's check it out on Resque UI (`http://localhost:3000/resque_web`): 
<blockquote class="imgur-embed-pub" lang="en" data-id="a/VLbw2"><a href="//imgur.com/VLbw2"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
Resque is working so now we are able to run time-consuming tasks in the background (sending notifications, processing files, calling third party APIs). 


