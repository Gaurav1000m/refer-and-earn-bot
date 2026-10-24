/*CMD
  command: /waitchannel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (User.getProperty("SetChannel") != "true") {
  return;
}

Bot.setProperty("ForceChannel", message, "string");

User.setProperty("SetChannel", "false", "string");

Bot.sendMessage(
  "✅ Force Join Channel Updated\n\n📢 Channel: " + message
);
