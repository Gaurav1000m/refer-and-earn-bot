/*CMD
  command: /adminpanel
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

/* COMMAND: /admin  */

let admin = Bot.getProperty("AdminID")

// --- ADMIN CHECK ---
if(user.telegramid != admin){
  Bot.sendMessage("🚫 Access Denied!\nOnly Admin can use this command. If you are an admin, use /setadmin and add your admin ID.")
  return
}

// Delete previous admin panel message when opened from callback button
if(request.data){
  Api.deleteMessage({
    message_id: request.message.message_id
  })
}

// --- ADMIN PANEL MESSAGE + BUTTONS ---
Api.sendMessage({
  text:
    "🎛 <b>ADMIN CONTROL PANEL - PAGE 1</b>\n\n" +
    "Choose an action below:",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [
        {text:"🚫 Ban User", callback_data:"/ban", style:"danger"},
        {text:"♻ Unban User", callback_data:"/unban", style:"success"}
      ],
      [
        {text:"💰 Add Balance", callback_data:"/addbal", style:"success"},
        {text:"✂ Cut Balance", callback_data:"/cutbal", style:"danger"}
      ],
      [
        {text:"📢 Broadcast", callback_data:"/broadcast", style:"primary"},
        {text:"👤 Check Balance", callback_data:"/checkbal", style:"primary"}
      ],
      [
        {text:"👥 User List", callback_data:"userlist", style:"primary"},
        {text:"📢 Set Channel", callback_data:"/setchannel", style:"primary"}
      ],
      [
        {text:"👑 Set Admin ID", callback_data:"/setadmin", style:"danger"},
        {text:"🎁 Set Refer Reward", callback_data:"/setrefreward", style:"success"}
      ],
      [
        {text:"➡️ Next Page", callback_data:"/admin2", style:"primary"}
      ]
    ]
  }
})
