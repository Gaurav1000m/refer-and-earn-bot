/*CMD
  command: /checkbal
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

/* COMMAND: /checkbal */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let parts = message.split(" ")

if(parts.length < 2){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/checkbal userid`\n\n" +
    "*Example:*\n" +
    "`/checkbal 123456789`",
    { parse_mode: "Markdown" }
  )
  return
}

let uid = parts[1]

// ⭐ Read other user's balance
let res = Libs.ResourcesLib.anotherUserRes("balance", uid)
let balance = res.value() || 0

Bot.sendMessage(
  "👤 *USER BALANCE DETAILS*\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 *User ID:* `" + uid + "`\n" +
  "💰 *Balance:* `" + balance + " Points`\n\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  "✅ *Balance check completed successfully!*",
  { parse_mode: "Markdown" }
)
