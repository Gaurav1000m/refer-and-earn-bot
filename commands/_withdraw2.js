/*CMD
  command: /withdraw2
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

var maxwith = 15
var minwith = 10

var adminID = Bot.getProperty("AdminID")
var stat = Bot.getProperty(user.telegramid + "?Ban")

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*")
  return
}

if (isNaN(message)) {
  Bot.sendMessage("❌ Enter a valid amount.")
  return
}

var amount = parseFloat(message)

var wallet = User.getProperty("wallet")
var balance = Libs.ResourcesLib.userRes("balance")
var payouts = Libs.ResourcesLib.anotherChatRes("payouts", "global")

if (!wallet) {
  Bot.sendMessage("❌ Please set your UPI ID first.")
  return
}

if (amount < minwith) {
  Bot.sendMessage("❌ Minimum Withdraw: " + minwith + " INR")
  return
}

if (amount > maxwith) {
  Bot.sendMessage("❌ Maximum Withdraw: " + maxwith + " INR")
  return
}

if (amount > balance.value()) {
  Bot.sendMessage(
    "❌ Balance Not Enough!\n\nAvailable Balance: " +
    balance.value().toFixed(2) +
    " INR"
  )
  return
}

balance.remove(amount)
payouts.add(amount)

var reqID = "WD" + Date.now()

Bot.setProperty(
  "withdraw_" + reqID,
  {
    id: reqID,
    user_id: user.telegramid,
    name: user.first_name,
    username: user.username,
    amount: amount,
    wallet: wallet,
    status: "Pending"
  },
  "json"
)

Bot.sendMessage(
  "*✅ Withdrawal Request Submitted*\n\n" +
  "🆔 Request ID: `" + reqID + "`\n" +
  "💰 Amount: `" + amount + " INR`\n" +
  "💳 UPI: `" + wallet + "`\n\n" +
  "⏰ Wait 1-12 Hours."
)

Api.sendMessage({
  chat_id: adminID,
  text:
    "<b>💸 New Withdrawal Request</b>\n\n" +
    "<b>Request ID:</b> <code>" + reqID + "</code>\n" +
    "<b>User:</b> <a href='tg://user?id=" + user.telegramid + "'>" +
    user.first_name +
    "</a>\n" +
    "<b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
    "<b>Amount:</b> " + amount + " INR\n" +
    "<b>UPI:</b> <code>" + wallet + "</code>\n" +
    "<b>Status:</b> Pending",

  parse_mode: "html",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Approve",
          callback_data: "/approve " + reqID
        },
        {
          text: "❌ Reject",
          callback_data: "/reject " + reqID
        }
      ]
    ]
  }
})
