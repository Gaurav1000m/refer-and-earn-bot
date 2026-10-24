/*CMD
  command: /admin2
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

/* COMMAND: /admin2 */

let admin = Bot.getProperty("AdminID")

if(user.telegramid != admin){
Bot.sendMessage("🚫 Access Denied!\nOnly Admin can use this command.")
return
}

// Delete previous admin panel message
if(request.data){
Api.deleteMessage({
message_id: request.message.message_id
})
}

Api.sendMessage({
text:
"🎛 <b>ADMIN CONTROL PANEL - PAGE 2</b>\n\n" +
"More settings and controls:",
parse_mode: "html",
reply_markup: {
inline_keyboard: [
[
{
text:"👀 Pending Withdrawal",
callback_data:"/pending",
style:"danger"
}
],
[
{
text:"⬅️ Previous Page",
callback_data:"/adminpanel",
style:"primary"
}
]
]
}
})
