/*CMD
  command: 💰 My Wallet
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

var balance = Libs.ResourcesLib.userRes("balance")
var wallet = User.getProperty("wallet", "❌ Not Set")
var refCount = RefLib.getRefCount()
var latestBalance = balance.value().toFixed(2)

var userLink =
  "<a href='tg://user?id=" +
  user.telegramid +
  "'>" +
  user.first_name +
  "</a>"

Api.sendMessage({
  text:
    "╔════════════════════╗\n" +
    "      👤 <b>USER PROFILE</b>\n" +
    "╚════════════════════╝\n\n" +

    "🧑 <b>Name:</b> " + userLink + "\n" +
    "🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
    "📛 <b>Username:</b> " +
    (user.username ? "@" + user.username : "❌ Not Set") +
    "\n\n" +

    "💳 <b>UPI ID</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━\n" +
    "<code>" + wallet + "</code>\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 <b>Total Referrals:</b> " + refCount + "\n\n" +

    "━━━━━━━━━━━━━━━━━━━━\n" +
    "💰 <b>Current Balance</b>\n" +
    "<code>      " + latestBalance + " POINTS      </code>\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +

    "🎯 <i>Invite friends and grow your earnings.</i>\n" +
    "🏦 <i>Your saved UPI ID will be used for withdrawals.</i>\n" +
    "🚀 <i>Keep earning and keep growing!</i>",

  parse_mode: "html",
  disable_web_page_preview: true
})
