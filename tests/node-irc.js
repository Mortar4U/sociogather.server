var md5 = require("utils/md5");
var irc = require("node-irc");

var connConfig = {
  server: 'irc.freenode.net',
  port: 6667,
  username: 'testerformylife',
  fullname: 'Miguel Castillo',
  channel: '#mortar4u'
};

var id = md5.hex_md5( connConfig.server + ":" + connConfig.username );

var bot = new irc(connConfig.server, connConfig.port, connConfig.username, connConfig.fullname);
bot.verbosity = 2;

bot.on("ready", function() {
  console.log("ready", id);
  bot.join(connConfig.channel);
  bot.say(connConfig.channel, "hello");  
});

bot.on('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.on('message#blah', function (from, message) {
  console.log('<%s> %s', from, message);
});

bot.on('message', function (from, to, message) {
  console.log('%s => %s: %s', from, to, message);

  if ( to.match(/^[#&]/) ) {
    // channel message
    if ( message.match(/hello/i) ) {
      bot.say(to, 'Hello there ' + from);
    }
    if ( message.match(/dance/) ) {
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: :D\\-<\u0001") }, 1000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: :D|-<\u0001")  }, 2000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: :D/-<\u0001")  }, 3000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: :D|-<\u0001")  }, 4000);
    }
  }
  else {
    // private message
  }
});

bot.on('pm', function(nick, message) {
  console.log('Got private message from %s: %s', nick, message);
});

bot.on('join', function(channel, who) {
  console.log('%s has joined %s', who, channel);
});

bot.on('part', function(channel, who, reason) {
  console.log('%s has left %s: %s', who, channel, reason);
});

bot.on('kick', function(channel, who, by, reason) {
  console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});

bot.connect();
