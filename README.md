### Background - A simple cron app showing Cloud Foundry's standalone or background apps feature ###

This app runs in the background and simply prints timestamp every minute. This app uses `cron` and `time` modules to schedule jobs and print timestamps.  To run this on Cloud Foundry, you must use `standalone` feature/framework (see down below).

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

##Running Standalone / background apps ##
Running an app as a standalone / background app is very similar to running regular apps with the following exceptions.

1. The framework should be `standalone`. Sometimes `vmc` auto-recognizes the app as `node` or `ruby` or `java` etc. In that case, select `other` option and then select `standalone` option.

2. You need to specify how to start the app (`Startup command> node app.js`)

3. Select `none` to `URL` question if your app doesn't run as a web-app like below.
```
1: background.cloudfoundry.com
2: none
URL> 2  <---  Choose 'none' as we don't have a web-UI
```


##Running it on Cloud Foundry ##

```
[~/success/git/background]
> vmc push background  <--- Upload app w/ 'background'-app name
Instances> 4   <--- Push app to run on 4 instances

1: node
2: other
Framework> 2   <--- Choose 'other' framework

1: node
2: lift
3: standalone
4: rack
5: sinatra
6: spring
7: play
8: java_web
9: grails
10: rails3
Framework> 3   <---- Choose 'standalone' framework (for background processing)

Startup command> node app.js  <--- Specify how to start the app

1: node
2: node06
3: node08
4: other
Runtime> 3  <--- Use Node.js 0.8v (current latest)

1: 64M
2: 128M
3: 256M
Memory Limit> 64M

Creating background... OK

1: background.cloudfoundry.com
2: none
URL> 2  <---  Choose 'none' as we don't have a web-UI


Create services for application?> n

Bind other services to application?> n

Save configuration?> n

Uploading background... OK
Starting background... OK
Checking background... OK
```

####Result:####
If you look into the logs `vmc logs <appname> --all`, you'll see timestamp being printed every minute by workers running on each app instance.

<p align='center'>
<img src="https://github.com/rajaraodv/background/raw/master/pics/bgResult.png" height="400px" width="350px" />
</p>

## General Notes ####
* If you don't have Node.js, download it from <a href='http://nodejs.org' target='_blank'>here</a>
* If you don't have a Cloud Foundry account, sign up for it <a href='https://my.cloudfoundry.com/signup' target='_blank'>here</a>
* Check out Cloud Foundry getting started <a href='http://docs.cloudfoundry.com/getting-started.html' target='_blank'>here</a> & install `vmc` Ruby command line tool to push apps.
* To install ***latest alpha or beta*** `vmc` tool run: `sudo gem install vmc ---pre`
