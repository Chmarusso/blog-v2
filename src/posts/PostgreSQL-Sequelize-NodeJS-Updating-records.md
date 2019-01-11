---
title: PostgreSQL/Sequelize / NodeJS - Updating records
date: 2017-05-07 21:18:05
tags:
- dajsiepoznac2017
- getnoticed
- javascript
- postgresql
- nodejs 
- sequelize
intro: Today I learned how to talk with PostgreSQL using Sequelize ORM.
cover: /images/sequelize-nodejs-postgresql.jpg
---
One of my applications is aggregating sports matches. I want to update a status of all matches that have empty status and started 20 minutes ago. Using Rails ActiveRecord it is as simple as: 
```ruby
Match.where('status = ? AND starts_at < ?', '', Time.now - 20.minutes)
     .update_all(status: 'Canceled')
```

As I'm learning NodeJS I decided to write a script that will do the exactly same thing but in NodeJS.  First I've initialized project: 
```
$ npm init
```

Then installed [sequelize](http://docs.sequelizejs.com/en/v3/) (nice promise-based ORM) and pg packages: 
```
$ npm install sequelize --save
$ npm install pg --save
```
Before we can query our PostgreSQL we need to establish a connection to it and define models we want to use. I've created `db.js` file for it: 
```javascript
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://dbuser:dbpasss@localhost:5432/app_db');

const Match = sequelize.define('match', {
    starts_at: {
      type: Sequelize.DATE
    },  
    status: {
      type: Sequelize.STRING
    }            
  }, 
  {
    timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at'
  }
);

module.exports.sequelize = sequelize;
module.exports.Match = Match;
```

Now let's create `cancelMatches()` function in the separate file and export it:
```javascript 
const twentyMinsAgo = new Date(Date.now() - 1000 * 60 * 20);

module.exports = function cancelMatches(db) {
    return new Promise((resolve, reject) => {
        db.Match.update({status: 'Canceled'}, {where: {status: '', starts_at: {$lt: twentyMinsAgo}}})
            .then(function(result) {
                resolve(result[0]);
            })
            .catch(function(err){
                reject(err);
            });
    });
};
```

We have DB connection, model and function to do the job. Let's combine all those things at `index.js` file: 
```javascript 
const db = require('./db.js');
const cancelMatches = require('./cancelMatches');

cancelMatches(db);
```
Done! Now we can fire this script every time we want (manually or using cron):
```
$ node ./index.js
```
