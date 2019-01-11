---
title: Backup your whole filesystem using Rsnapshot
date: 2017-04-15 16:55:53
tags:
- dajsiepoznac2017
- getnoticed
- linux
- unix
- backup
- rsnapshot
intro: There are only two types of people in the world. Those who are doing regular backups and those who will start doing it someday.
cover: /images/rsnapshot-backups.jpg
---
There are only two types of people in the world. Those who are doing regular backups and those who will start doing it someday. Some host companies are offering automatical backup services, but I decided to choose "hacker way" and I bought dedicated VPS server ([$5/month](https://portal.hosthatch.com/aff.php?aff=745)) for backup purposes. One friend of mine recommended me Rsnapshot which is an incremental backup tool that uses a power of Rsync and SSH.

Installation of Rsnapshot is very easy, just install it using your favourite packet manager:
```
$ apt-get install rsnapshot
```
Backup tool installed, so now we need to allow our backup server to connect to our remote server (the one we want to actually backup). I
do not want to use any passwords, so I will create SSH key:
```
$ ssh-keygen -t rsa -b 4096 -C "backup@server"
```
Now we need to add public key on our remote machine. For security reasons I've created a dedicated user for backup on the remote server:
```
$ sudo useradd backupuser -m
$ sudo mkdir /home/backupuser/.ssh
$ sudo nano /home/backupuser/.ssh/authorized_keys
```

I want to give our user root access only for Rsync application. To do so I will create a wrapper for Rsync:
```
$ sudo nano /home/backupuser/rsync-wrapper.sh
```

And fill it with content:
```bash
#!/bin/sh
date >> /home/backupuser/backuplog
echo $@ >> /home/backupuser/backuplog
/usr/bin/sudo /usr/bin/rsync "$@";
```

Above script logs each usage of Rsync and runs it with super user permissions. backupuser cannot run any command with sudo, so we need to change it as well by adding one line to `/etc/sudoers`:
```
backupuser ALL=NOPASSWD: /usr/bin/rsync
```

After all those steps get back to your backup machine and test connection to the remote server:
```
ssh backupuser@REMOTE -i /home/backup_server_user/.ssh/id_rsa
```

If the connection works we can proceed to Rsnapshot configuration. Let's see what we've got in the `/etc/rsnapshot.conf`. There are many ways to tweak Rsnapshot, but the most important parts are:

`snapshot_root` - directory where snapshots are stored
`cmd_ssh` - uncomment this line if you want to use SSH
`interval hourly` - define how many hourly backups to keep.
`interval daily` - define how many daily backups to keep.
`interval weekly` - define how many weekly backups to keep.
`interval monthly` - define how many monthly backups to keep.
`ssh_args` - additional arguments for SSH connection, for example port number
`rsync_long_args` - additional arguments for rsync. I've added here path to rsync wrapper: `--rsync-path=/home/backupuser/rsync-wrapper.sh`
`backup` - define remote server and relative path for backups, for example:
backupuser@remoteserver.com:/ remoteserver/


Once you saved configuration file you can check if syntax is fine:
```
$ rsnapshot configtest
```
And then run test backup with `-t` option:
```
$ rsnapshot -t hourly
```

Every backup should be done automatically, so we gonna create cron  tasks for that `crontab -e`:
```
0 */4   * * *           root    /usr/bin/rsnapshot hourly
30 3    * * *           root    /usr/bin/rsnapshot daily
0  3    * * 1           root    /usr/bin/rsnapshot weekly
30 2    1 * *           root    /usr/bin/rsnapshot monthly
```
