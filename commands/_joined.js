/*CMD
  command: /joined
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

let stat = Bot.getProperty(user.telegramid + "?Ban");

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*");
} else {

  let channel = Bot.getProperty("ForceChannel");

  if (!channel) {
    Bot.sendMessage("❌ Force Join Channel username Not Set");
    return;
  }

  Api.getChatMember({
    chat_id: channel,
    user_id: user.telegramid,
    on_result: "check"
  });

}
