/*CMD
  command: /cutbal
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

/* COMMAND: /cutbal */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let parts = message.split(" ")

if(parts.length < 3){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/cutbal userid amount`\n\n" +
    "Example:\n" +
    "`/cutbal 123456789 50`",
    {parse_mode:"Markdown"}
  )
  return
}

let uid = parts[1]
let amount = parseFloat(parts[2])

if(isNaN(amount) || amount <= 0){
  Bot.sendMessage("❌ Please enter a valid amount!")
  return
}

let res = Libs.ResourcesLib.anotherUserRes("balance", uid)
let oldBal = res.value() || 0

if(oldBal < amount){
  Bot.sendMessage("❌ User doesn't have enough balance!")
  return
}

res.remove(amount)

let newBal = res.value()

// ✔ Notify admin
Bot.sendMessage(
  "✂ *Balance Deducted Successfully*\n\n" +
  "👤 User ID: `" + uid + "`\n" +
  "➖ Deducted: `" + amount + "`\n" +
  "💰 Old Balance: `" + oldBal + "`\n" +
  "💳 New Balance: `" + newBal + "`",
  {parse_mode:"Markdown"}
)

// ✔ Notify user
Api.sendMessage({
  chat_id: uid,
  text:
    "🔔 *Balance Updated!*\n\n" +
    "📌 *Deducted:* `-" + amount + "` Points\n" +
    "💰 *Old Balance:* `" + oldBal + "`\n" +
    "💳 *New Balance:* `" + newBal + "`\n\n" +
    "👮 *Updated by Admin*",
  parse_mode: "Markdown"
})
