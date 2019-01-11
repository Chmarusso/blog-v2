---
title: Let's Encrypt website for free
date: 2017-03-28 21:32:54
tags:
- dajsiepoznac2017
- getnoticed
- ssl
- server
intro: Short tutorial describing how to setup SSL on Nginx without spending a dime on it.
cover: /images/letsencrypt.jpg
---
Since the beginning of this year, Chrome browser is labeling all websites without SSL protection as non-secure. Of course, it is not applied to static pages, but for websites with any forms that are posted through the wire, it is highly recommended. Luckily the whole process is really simple and it is not expensive, as we can issue free of charge certificates using https://letsencrypt.org.

The whole process is very smooth and you can walk through all steps without leaving your shell terminal. Enough talking, let's start.

First of all, you need to setup Nginx non-SSL virtual host for your domain:
```
sudo nano /etc/nginx/sites-available/example.com
```
Now we have to add some temporary configuration of the virtual host:
```
server {
    listen 80;
    listen [::]:80;

    server_name www.example.com example.com;
    root /var/www/html;
    index index.html index.htm;

    location ~ /.well-known {
      allow all;
    }
}
```
Once config is done we need to enable our host:
```
$ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
$ sudo service nginx reload
```
Now we can install Let's Encrypt and generate certificate and key:
```
$ sudo apt-get install letsencrypt
$ sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html -d example.com -d www.example.com
```
During the generation process, you just have to provide your e-mail address and agree to terms of use. If everything went fine you should see congratulations message. Otherwise, you need to check your Nginx or firewall configurations. Your certificate and private key should be located in `/etc/letsencrypt/live/example.com` directory .

Now generate an additional file that is required for increased security of your domain:
```
$ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```
Finally, we have got all ingredients, so we can get back to our Nginx host configuration:
```
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
    ssl_ecdh_curve secp384r1;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;

    server_name www.example.com example.com;
    root /var/www/html;
    index index.html index.htm;
}
```
Do not forget to reload configuration:
```
$ sudo service nginx reload
```
First server block is listens on 80 port and redirects all non-SSL clients to second server block which is handling all requests using SSL.
