/*CMD
  command: /broadcast
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

/* COMMAND: /broadcast */

let adminID = Bot.getProperty("AdminID")

if(user.telegramid != adminID){
  Bot.sendMessage("❌ Access Denied: Only Admin Allowed!")
  return
}

let msg = message.replace("/broadcast ","").trim()

if(!msg){
  Bot.sendMessage(
    "⚠ *Usage:*\n\n" +
    "`/broadcast your message here`\n\n" +
    "*Example:*\n" +
    "`/broadcast Hello everyone! New update released 🚀`",
    {parse_mode:"Markdown"}
  )
  return
}

let list = Bot.getProperty("broadcast_list", [])

if(!list || list.length === 0){
  Bot.sendMessage("📭 *No users available for broadcast!*", {
    parse_mode:"Markdown"
  })
  return
}

Bot.sendMessage(
  "📢 *Broadcast Started!*\n\n" +
  "👥 Total Users: `" + list.length + "`\n" +
  "⏳ Sending messages...",
  {parse_mode:"Markdown"}
)

let success = 0
let failed = 0

for(var i in list){
  try{
    Api.sendMessage({
      chat_id: list[i],
      text: msg
    })
    success++
  }catch(e){
    failed++
  }
}

Bot.sendMessage(
  "✅ *Broadcast Completed Successfully!*\n\n" +
  "📨 Sent: `" + success + "`\n" +
  "❌ Failed: `" + failed + "`\n" +
  "👥 Total Users: `" + list.length + "`",
  {parse_mode:"Markdown"}
)
