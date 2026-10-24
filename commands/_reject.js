/*CMD
  command: /reject
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

var reqID = params

var data = Bot.getProperty("withdraw_" + reqID)

if (!data) {
  Bot.sendMessage("❌ Request not found")
  return
}

if (data.status != "Pending") {
  Bot.sendMessage("⚠️ This request has already been processed")
  return
}

// Refund balance to user
var userBalance = Libs.ResourcesLib.anotherUserRes(
  "balance",
  data.user_id
)

userBalance.add(parseFloat(data.amount))

// Update status
data.status = "Rejected"
Bot.setProperty("withdraw_" + reqID, data, "json")

// Notify user
Api.sendMessage({
  chat_id: data.user_id,
  text:
    "❌ Your withdrawal request has been rejected.\n\n" +
    "💰 Refunded Amount: " + data.amount + " INR\n" +
    "✅ The amount has been returned to your balance."
})

// Delete admin request message
if (request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  })
}

Bot.sendMessage("❌ Withdrawal rejected and balance refunded successfully.")
