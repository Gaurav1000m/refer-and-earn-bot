/*CMD
  command: /waitadmin
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

/* COMMAND: /waitadmin */
/* Wait for Answer = ON */

if (isNaN(message)) {
  Bot.sendMessage("❌ Please send a valid Telegram ID")
  return
}

Bot.setProperty("AdminID", parseInt(message), "integer")

Bot.sendMessage(
  "✅ Admin ID Updated Successfully\n\n" +
  "👑 New Admin ID: `" + message + "`"
)
