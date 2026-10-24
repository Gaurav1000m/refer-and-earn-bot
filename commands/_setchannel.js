/*CMD
  command: /setchannel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("AdminID");

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Access Denied");
  return;
}

Bot.sendMessage("*Send Channel Username*\nExample:\n@YourChannel");

User.setProperty("SetChannel", "true", "string");
Bot.runCommand("/waitchannel");
