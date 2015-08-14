var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
})
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data) {
        console.log(data);
    });
    bot.drone.ftrim();
    bot.drone.takeoff();
    //bot.drone.hover();
    after(10*1000, function(){
        bot.drone.left(0.05);
    });
    after(12*1000, function() {
        bot.drone.left(0);
    });
    after (13*1000, function(){
        bot.drone.right(0.05);
    });
    after(15*1000, function() {
        bot.drone.right(0);
    });
    after(16*1000, function() {
        bot.drone.land();
    });
    after(17*1000, function() {
        bot.drone.stop();
    });
}

Cylon.start();
