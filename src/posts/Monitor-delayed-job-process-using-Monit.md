---
title: Monitor delayed_job process using Monit
date: 2017-04-30 18:52:45
tags:
- dajsiepoznac2017
- getnoticed
- monit
- ruby
intro: Learn how to use Monit and forget about not working background processor.
cover: /images/monit.jpg
---
One of my Rails apps is using [delayed_job](https://github.com/collectiveidea/delayed_job) for background processing. In this app, every published post is automatically submitted to Twitter and Facebook. Calls to external APIs are time-consuming, so instead of hanging client HTTP response, I'm performing such operations in the background. This approach is generally working, but couple times I realized that new posts were not published on my FB fan page. For some reason, the delayed_job process was killed on my server machine. As I do not want to keep looking for delayed_job processes on my own I decided to use [monit](https://mmonit.com/monit/) for monitoring it. 

Monit is a tool which monitor processes in Unix operating systems. Installation and configuration are very easy: 
```
$ apt-get install monit
```

Once Monit is installed we need to add a new configuration for a process that we want to monitor. Monit needs to know what is a PID of the process and how monitored process should be started and stopped. We can declare those things in `/etc/monit/conf.d/delayed_job.monitrc`: 
```
check process delayed_job
  with pidfile  /home/deploy/apps/myapp/shared/tmp/pids/delayed_job.pid
  start program = "/etc/monit/scripts/delayed_job start"
  stop program = "/etc/monit/scripts/delayed_job stop"
```
Above configuration is using small bash script (`/etc/monit/scripts/delayed_job`)which starts and stops delayed_job in my Rails application: 
```bash
#!/usr/bin/env bash
RAILS_ENV=production
USER=deploy
APP_DIR=/home/deploy/apps/myapp/current

case "$1" in
  start)
    echo "Starting delayed_job..."
    /bin/su - $USER -c "cd $APP_DIR && RAILS_ENV=$RAILS_ENV bundle exec bin/delayed_job start"
    echo "done"
    ;;

  stop)
    echo "Stopping delayed_job..."
    /bin/su - $USER -c "cd $APP_DIR && RAILS_ENV=$RAILS_ENV bundle exec bin/delayed_job stop"
    echo "done"
    ;;

  restart)
    echo "Restarting delayed_job..."
    /bin/su - $USER -c "cd $APP_DIR && RAILS_ENV=$RAILS_ENV bundle exec bin/delayed_job restart"
    echo "done"
    ;;
esac
```

Do not forget about execution permissions: 
```
$ chmod +x /etc/monit/scripts/delayed_job
```
Now we can reload monit: 
```
$ sudo monit reload 
```

From now on monit will be watching our delayed_job process. Anytime we can start, stop or restart it: 
```
$ sudo monit start delayed_job 
$ sudo monit restart delayed_job 
$ sudo monit stop delayed_job 
```

Delayed_job is using our app codebase, so after each deploy, the process should be restarted. We can do it easily by adding such task to Capistrano: 
```ruby
after 'deploy:publishing', 'deploy:dj_restart'
namespace :deploy do
  task :dj_restart do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute 'sudo monit restart delayed_job'
        end
      end
    end
  end
end
```