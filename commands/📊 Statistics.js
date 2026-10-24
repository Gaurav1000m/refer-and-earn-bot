/*CMD
  command: 📊 Statistics
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

var stat = Bot.getProperty("" + user.telegramid + "?Ban")

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*")
} else {

  var payouts = Libs.ResourcesLib.anotherChatRes("payouts", "global")
  var status = Libs.ResourcesLib.anotherChatRes("status", "global")

  var totalPayouts = payouts.value() || 0
  var totalUsers = status.value() || 0

  var stats =
    "<b>📊 BOT LIVE STATISTICS 📊</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "📤 <b>Total Payouts:</b>\n" +
    "<code>" + totalPayouts.toFixed(2) + " Points</code>\n\n" +
    "👥 <b>Total Users:</b>\n" +
    "<code>" + totalUsers.toFixed(0) + " User(s)</code>\n\n" +
    "⚡ <b>Bot Status:</b>\n" +
    "<code>ONLINE & RUNNING</code>\n\n" +
    "🛠 <b>Developer:</b>\n" +
    "@VishalCodeVerse\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "🚀 Thank you for being a part of our community!"

  Api.sendAnimation({
    chat_id: chat.chatid,
    animation: "https://i.ibb.co/6xngByp/giphy.gif",
    caption: stats,
    parse_mode: "html",
    disable_web_page_preview: true
  })
}
