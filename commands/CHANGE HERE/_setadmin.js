/*CMD
  command: /setadmin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CHANGE HERE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* COMMAND: /setadmin */

let admin = 7322863818 // Current Admin ID

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Access Denied")
  return
}

Bot.sendMessage("👑 Send New Admin ID:")
Bot.runCommand("/waitadmin")
