/*CMD
  command: 👥 Refer & Earn
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /invite
  group: 
CMD*/

let perref = Bot.getProperty("RefReward") || 1

let stat = Bot.getProperty("" + user.telegramid + "?Ban")

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*")
  return
}

let invLink = RefLib.getRefLink(bot.name, "Bot")

if(request.data){
  Api.deleteMessage({
    message_id: request.message.message_id
  })
}

Api.sendPhoto({
  chat_id: chat.chatid,
  photo: "https://i.ibb.co/fGv9HKmy/360-F-971852765-u-REI1r-Yv-RBUNj7qev-U0-MEa-Trj-Fie-Rokn.jpg",
  caption:
    "<b>🎁 REFER & EARN PROGRAM</b>\n\n" +
    "👥 Total Referrals: <code>" + RefLib.getRefCount() + "</code>\n\n" +
    "🔗 Your Invite Link:\n<code>" + invLink + "</code>\n\n" +
    "💰 Reward Per Referral: <code>" + perref + " Point</code>\n" +
    "💵 1 Point = ₹1",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔍 My Refers",
          callback_data: "/myrefers",
          style: "primary"
        },
        {
          text: "🔥 Top List",
          callback_data: "/toplist",
          style: "success"
        }
      ]
    ]
  }
})
