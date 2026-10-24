/*CMD
  command: /ban
  help: 
  need_reply: false
  auto_retry_time: 
  folder: admin panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* COMMAND: /ban */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let parts = message.split(" ")

if(parts.length < 2){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/ban userid`\n\n" +
    "*Example:*\n" +
    "`/ban 123456789`",
    { parse_mode: "Markdown" }
  )
  return
}

let uid = parts[1]

// Ban User
Bot.setProperty(uid + "?Ban", "ban", "string")

// Notify Admin
Bot.sendMessage(
  "🚫 *User Banned Successfully!*\n\n" +
  "👤 *User ID:* `" + uid + "`\n" +
  "🔒 *Status:* `BANNED`\n\n" +
  "⛔ User can no longer use the bot.",
  { parse_mode: "Markdown" }
)

// Notify User
Api.sendMessage({
  chat_id: uid,
  text:
    "🚫 *Your account has been banned!*\n\n" +
    "⛔ You can no longer use this bot.\n" +
    "📩 Contact the admin if you believe this was a mistake.",
  parse_mode: "Markdown"
})
