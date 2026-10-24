/*CMD
  command: ⚙️ Payment Settings
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

var wallet = User.getProperty("wallet", "⛔ Not Set")

Api.sendAnimation({
  chat_id: chat.chatid,
  animation: "https://i.ibb.co/Vcp76Sh8/settings.gif",
  caption:
    "<b>💳 UPI WALLET DETAILS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🏦 <b>Your Current UPI ID:</b>\n" +
    "<code>" + wallet + "</code>\n\n" +
    "💹 <i>This UPI ID will be used for all future withdrawals and payouts.</i>\n\n" +
    "🔒 <i>Please make sure your UPI ID is correct to avoid payment issues.</i>\n\n" +
    "━━━━━━━━━━━━━━━━━━",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💠 Set / Change UPI ID 💠",
          callback_data: "/setwallet",
          style: "primary"
        }
      ]
    ]
  }
})
