/*CMD
  command: userlist
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

/* COMMAND: /userlist */

// Get Admin ID from Bot Property
let adminID = Bot.getProperty("AdminID")

// Admin Check
if (user.telegramid != adminID) {
  Bot.sendMessage(
    "🚫 *Access Denied!*\n\n" +
    "Only the bot admin can use this command.",
    { parse_mode: "Markdown" }
  )
  return
}

// Get Total Users
let totalUsers = Libs.ResourcesLib.anotherChatRes("status", "global").value()

// If no users found
if (!totalUsers) {
  totalUsers = 0
}

// Send User Statistics
Bot.sendMessage(
  "👥 *USER STATISTICS*\n\n" +
  "━━━━━━━━━━━━━━\n" +
  "👤 Total Users: *" + totalUsers + "*\n" +
  "━━━━━━━━━━━━━━",
  { parse_mode: "Markdown" }
)
