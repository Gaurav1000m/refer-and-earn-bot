/*CMD
  command: /unban
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

/* COMMAND: /unban */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let parts = message.split(" ")

if(parts.length < 2){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/unban userid`\n\n" +
    "*Example:*\n" +
    "`/unban 123456789`",
    {parse_mode:"Markdown"}
  )
  return
}

let uid = parts[1]

// Remove ban status
Bot.setProperty(uid + "?Ban", "", "string")

// Notify Admin
Bot.sendMessage(
  "♻ *User Unbanned Successfully!*\n\n" +
  "👤 User ID: `" + uid + "`\n" +
  "✅ Status: `UNBANNED`\n\n" +
  "🔓 User can now use the bot again.",
  {parse_mode:"Markdown"}
)

// Notify User
Api.sendMessage({
  chat_id: uid,
  text:
    "🎉 *Your account has been unbanned!*\n\n" +
    "✅ You can now use the bot again.\n\n" +
    "Thank you for your patience.",
  parse_mode: "Markdown"
})
