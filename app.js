var cronJob = require('cron').CronJob;
new cronJob('* * * * *', function(){
    console.log('Time now: ' + new Date());
}, null, true, 'America/Los_Angeles');