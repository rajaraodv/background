### Background - A simple cron app showing Cloud Foundry's standalone or background apps feature ###

This app once uploaded to Cloud Foundry as a background app, this simply prints timestamp every minute. You can run as many instances as you want as well.

```javascript
//package.json
{
    "name":"background",
    "description":"A simple cron app showing Cloud Foundry's standalone or background apps feature",
    "version":"0.0.1",
    "private":true,
    "scripts":{
        "start":"node app.js"
    },
    "dependencies":{
        "cron": "*",
        "time": "*"
    }
}
```


```javascript
//app.js
var cronJob = require('cron').CronJob;
new cronJob('* * * * *', function(){
    console.log('Time now: ' + new Date());
}, null, true, 'America/Los_Angeles');
```

