/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CHANGE HERE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* ================================================
🚀 Force Join + Referral + Broadcast Save (inline only)
================================================ */

// Admin ID from Property
let adminID = Bot.getProperty("AdminID")

// ========== CHANNEL CONFIGURATION ==========
let channels = [
  { name: "Channel 1", url: "https://t.me/VishalCodeVerse" },
  { name: "Channel 2", url: "https://t.me/+qFuyfoPdb4s2NjM1" },
  //{ name: "Channel 3", url: "https://t.me/+tF1PneDPAjIwY2I1" }
]

// ----- Create Inline Buttons -----
let keyboard = channels.map(ch => [
  {
    text: `🔗 Join ${ch.name}`,
    url: ch.url,
    style: "primary"
  }
])

keyboard.push([
  {
    text: "✅ Verify Membership",
    callback_data: "/joined",
    style: "success"
  }
])

// ========== FORCE JOIN MESSAGE WITH GIF ==========

Api.sendAnimation({
  chat_id: chat.chatid,
  animation: "https://i.ibb.co/cS26Z33z/original-b1a19080d42db2e56039a7342223b91d.gif",
  caption:
    "🔒 <b>Access Restricted</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━\n" +
    "⚠️ <b>You must join all our channels</b>\n" +
    "to unlock bot features.\n\n" +
    "📢 <b>Subscribe to every channel</b>\n" +
    "using the buttons below.\n\n" +
    "✅ <b>After joining all channels,</b>\n" +
    "tap the <b>Verify Membership</b> button.",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: keyboard
  }
})

/* ========== Referral Tracking ========== */

function touchingOwnLink() {
  Bot.sendMessage("*❌ Stop Clicking Your Own Link*")
}

function attractedByUser(refUser) {
  Api.sendMessage({
    chat_id: refUser.telegramid,
    text:
      "<b>🎉 You Got A New Referral!</b>\n\n" +
      "👤 <a href='tg://user?id=" + user.telegramid + "'>" +
      user.first_name +
      "</a> joined using your referral link.\n\n" +
      "💡 Reward will be credited after completing channel join.",
    parse_mode: "html"
  })
}

function alreadyStarted() {
  Bot.sendMessage("*🚫 You Have Already Started The Bot*")
}

RefLib.track({
  onTouchOwnLink: touchingOwnLink,
  onAtractedByUser: attractedByUser,
  onAlreadyAttracted: alreadyStarted,
  linkPrefix: "Bot"
})

/* ========== BROADCAST USER LIST ========== */

let broadcastUsers = Bot.getProperty("broadcast_list", [])

if (!broadcastUsers.includes(user.telegramid)) {
  broadcastUsers.push(user.telegramid)
  Bot.setProperty("broadcast_list", broadcastUsers, "json")
}

/* ========== New User Notification ========== */

if (!User.getProperty("UserDone")) {

  User.setProperty("UserDone", true, "boolean")

  let stat = Libs.ResourcesLib.anotherChatRes("status", "global")
  stat.add(1)

  if (adminID) {

    Api.sendMessage({
      chat_id: adminID,
      text:
        "➕ <b>New User Notification</b> ➕\n\n" +
        "👤 <b>User:</b> <a href='tg://user?id=" +
        user.telegramid +
        "'>" +
        user.first_name +
        "</a>\n" +
        "🆔 <b>ID:</b> <code>" +
        user.telegramid +
        "</code>\n" +
        "📛 <b>Username:</b> " +
        (user.username ? "@" + user.username : "Not Set") +
        "\n📊 <b>Total Users:</b> " +
        stat.value(),
      parse_mode: "html"
    })

  }
}

/* ========== END ========== */
