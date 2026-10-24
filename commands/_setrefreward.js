/*CMD
  command: /setrefreward
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

/* COMMAND: /setrefreward */

let admin = Bot.getProperty("AdminID")

if(user.telegramid != admin){
  Bot.sendMessage("❌ Access Denied")
  return
}

Bot.sendMessage(
  "🎁 Send New Refer Reward Amount\n\nExample:\n1\n5\n10"
)

Bot.runCommand("/waitrefreward")
