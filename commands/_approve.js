/*CMD
  command: /approve
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
  Bot.sendMessage("⚠️ Already processed")
  return
}

data.status = "Approved"

Bot.setProperty("withdraw_" + reqID, data, "json")

Api.sendMessage({
  chat_id: data.user_id,
  text:
    "✅ Your withdrawal has been approved.\n\n" +
    "💰 Amount: " + data.amount + " INR\n\n" +
    "💸 Payment will be sent shortly."
})

if (request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  })
}

Bot.sendMessage("✅ Withdrawal Approved")
