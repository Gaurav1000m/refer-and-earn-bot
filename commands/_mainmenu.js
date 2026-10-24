/*CMD
  command: /mainmenu
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

var refAmount = parseFloat(1) // Per Refer Amount
var userStat = User.getProperty("userStatus")

// --- FIX: Correct OR operator ---
if (!userStat || userStat == "left") {
  Bot.runCommand("/start")
  return
}

// --- User inside bot ---
if (
  userStat == "member" ||
  userStat == "administrator" ||
  userStat == "creator"
) {

  // --- Referral Reward System (unchanged logic) ---
  var referCount = User.getProperty("ReferStatus")

  if (referCount == undefined) {
    let refUser = RefLib.getAttractedBy()

    if (refUser) {
      var refbal = Libs.ResourcesLib.anotherUserRes(
        "balance",
        refUser.telegramid
      )

      refbal.add(refAmount)

      Api.sendMessage({
        chat_id: refUser.telegramid,
        text:
          "<b>🎉 Referral Bonus Received!</b>\n\n" +
          "You earned <b>" +
          refAmount +
          " Point</b> from <a href='tg://user?id=" +
          user.telegramid +
          "'>" +
          user.first_name +
          "</a> 🙌",
        parse_mode: "html"
      })

      User.setProperty("ReferStatus", "valid", "string")
    }
  }

  // --- delete callback if message came via button ---
  if (request.data) {
    Api.deleteMessage({
      message_id: request.message.message_id
    })
  }

  // ============================
  // 💎 COLORED KEYBOARD UI
  // ============================

  let menu = {
  keyboard: [
    [
      {
        text: "💰 My Wallet",
        style: "primary"
      }
    ],
    [
      {
        text: "👥 Refer & Earn",
        style: "success"
      },
      {
        text: "🎉 Claim Bonus",
        style: "success"
      }
    ],
    [
      {
        text: "💸 Withdraw Funds",
        style: "danger"
      }
    ],
    [
      {
        text: "⚙️ Payment Settings",
        style: "primary"
      },
      {
        text: "📊 Statistics",
        style: "primary"
      }
    ]
  ],
  resize_keyboard: true
}

  Api.sendAnimation({
  chat_id: chat.chatid,
  animation: "https://i.ibb.co/7dnTSHHm/original-ac994ae3bd1b0f083a1203b77917a16b.gif",
  caption:
    "🏠 Welcome Back " + user.first_name + "!\n\n" +
    "✨ Main Menu is ready!\n" +
    "👇 Pick an option to continue:",
  parse_mode: "html",
  reply_markup: JSON.stringify(menu)
})
}
