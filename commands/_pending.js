/*CMD
  command: /pending
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

var adminID = Bot.getProperty("AdminID")

if (user.telegramid != adminID) {
  Bot.sendMessage("❌ Access Denied")
  return
}

var list = Bot.getProperty("PendingWithdraws", [])

if (!list || list.length == 0) {
  Bot.sendMessage("✅ No Pending Withdrawal Requests.")
  return
}

var text = "💸 *Pending Withdrawal Requests*\n\n"
var count = 0

for (var i = 0; i < list.length; i++) {
  var data = Bot.getProperty("withdraw_" + list[i])

  if (data && data.status == "Pending") {
    count++

    text +=
      "🆔 *Request ID:* `" + data.id + "`\n" +
      "👤 *User:* " + data.name + "\n" +
      "🆔 *User ID:* `" + data.user_id + "`\n" +
      "💰 *Amount:* `" + data.amount + " INR`\n" +
      "💳 *UPI:* `" + data.wallet + "`\n" +
      "📌 *Status:* `" + data.status + "`\n\n"
  }
}

if (count == 0) {
  Bot.sendMessage("✅ No Pending Withdrawal Requests.")
} else {
  Bot.sendMessage(text)
}
