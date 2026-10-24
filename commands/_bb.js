/*CMD
  command: /bb
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

//━━━━━━━━━━━━━━━━━━━━━━━
// ⚙️ SETTINGS
//━━━━━━━━━━━━━━━━━━━━━━━
let CHANNEL_URL = "https://t.me/VishalCodeVerse";
let ADMIN_ID = 7322863818; // 👈 Apna Telegram User ID yahan daalo

//━━━━━━━━━━━━━━━━━━━━━━━
// 📧 Get Email
//━━━━━━━━━━━━━━━━━━━━━━━
let email = (params || "").trim();

//━━━━━━━━━━━━━━━━━━━━━━━
// ✅ Email Validation
//━━━━━━━━━━━━━━━━━━━━━━━
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  Api.sendMessage({
    text:
      "❌ <b>Invalid Email Address!</b>\n\n" +
      "📌 Please enter a valid email address.\n\n" +
      "💡 Example: <code>google@gmail.com</code>",
    parse_mode: "HTML"
  });
  return;
}

//━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 Install Bot
//━━━━━━━━━━━━━━━━━━━━━━━
BBAdmin.installBot({
  bot_id: bot.id,
  email: email
});

//━━━━━━━━━━━━━━━━━━━━━━━
// 👤 USER SUCCESS MESSAGE
//━━━━━━━━━━━━━━━━━━━━━━━
Api.sendMessage({
  text:
    "🎉 <b>Bot Successfully Sent To Your Bots.Business Mail!</b>\n\n" +
    "📩 <b>Email:</b> <code>" + email + "</code>\n\n" +
    "🤖 Your bot has been successfully delivered.\n\n" +
    "📢 Join our official channel for updates and support.\n\n" +
    "🙏 Thank you for using <b>Vishal CodeVerse</b> ❤️",
  parse_mode: "HTML",
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: "📢 Join Official Channel",
          url: CHANNEL_URL,
          style: "primary"
        }
      ]
    ]
  })
});

//━━━━━━━━━━━━━━━━━━━━━━━
// 🔔 ADMIN NOTIFICATION
//━━━━━━━━━━━━━━━━━━━━━━━
Api.sendMessage({
  chat_id: ADMIN_ID,
  text:
    "🚨 <b>New Bot Installation Detected!</b>\n\n" +
    "👤 <b>User:</b> <a href='tg://user?id=" + user.telegramid + "'>" +
    user.first_name + "</a>\n" +
    "🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
    "📩 <b>Email:</b> <code>" + email + "</code>\n\n" +
    "🤖 A new bot has been sent successfully.",
  parse_mode: "HTML"
});
