/*CMD
  command: /addbal
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

/* COMMAND: /addbal */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let parts = message.split(" ")

if(parts.length < 3){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/addbal userid amount`\n\n" +
    "Example:\n" +
    "`/addbal 123456789 50`",
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

let oldBal = res.value() || 0   // previous balance

res.add(amount)

let newBal = res.value()        // new balance

// ✔ Notify admin
Bot.sendMessage(
  "💹 *Balance Added Successfully*\n\n" +
  "👤 User ID: `" + uid + "`\n" +
  "➕ Added: `" + amount + "` Points\n" +
  "💰 Old Balance: `" + oldBal + "`\n" +
  "💳 New Balance: `" + newBal + "`",
  {parse_mode:"Markdown"}
)

// ✔ Notify user
Api.sendMessage({
  chat_id: uid,
  text:
    "🔔 *Balance Updated!*\n\n" +
    "📌 *Added:* `+" + amount + "` Points\n" +
    "💰 *Old Balance:* `" + oldBal + "`\n" +
    "💳 *New Balance:* `" + newBal + "`\n\n" +
    "👮 *Updated by Admin*",
  parse_mode: "Markdown"
})
