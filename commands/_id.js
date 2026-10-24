/*CMD
  command: /id
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

Api.sendMessage({
  text:
    "🆔 <b>Your Telegram ID</b>\n\n" +
    "<code>" + user.telegramid + "</code>",
  parse_mode: "HTML",
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: "📋 Tap to Copy ID",
          copy_text: {
            text: user.telegramid.toString()
          }
        }
      ]
    ]
  })
});
