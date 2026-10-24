/*CMD
  command: 🎉 Claim Bonus
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

function canRun() {
  var last_run_at = User.getProperty("last_run_at")

  if (!last_run_at) {
    return true
  }

  var minutes = (Date.now() - last_run_at) / 1000 / 60
  var minutes_in_day = 24 * 60

  if (minutes < minutes_in_day) {
    var next = minutes_in_day - minutes
    var wait_hours = Math.floor(next / 60)
    next -= wait_hours * 60
    var wait_minutes = Math.floor(next)

    Bot.sendMessage(
      "⛔ *Daily Bonus Already Claimed!*\n\n" +
      "⏳ Come back after `" +
      wait_hours +
      "h " +
      wait_minutes +
      "m`"
    )
    return false
  }

  return true
}

if (!canRun()) {
  return
}

// Loading Screen
var loading =
  "🎁 *Daily Bonus Processing...*\n\n" +
  "▓░░░░░░░░░ `10%`\n" +
  "▓▓▓░░░░░░░ `30%`\n" +
  "▓▓▓▓▓░░░░░ `50%`\n" +
  "▓▓▓▓▓▓▓░░░ `70%`\n" +
  "▓▓▓▓▓▓▓▓▓░ `90%`\n" +
  "▓▓▓▓▓▓▓▓▓▓ `100%`\n\n" +
  "🔄 Verifying eligibility...\n" +
  "💳 Preparing reward...\n" +
  "✅ Bonus approved!"

Bot.sendMessage(loading)

// Default Bonus = 0.5 INR if admin has not set it
let bonusAmount = Bot.getProperty("DailyBonus")
if (!bonusAmount) {
  bonusAmount = 0.5
}

// Save claim time
User.setProperty("last_run_at", Date.now(), "integer")

// Add bonus
let balance = Libs.ResourcesLib.userRes("balance")
balance.add(bonusAmount)

// Success Message
Bot.sendMessage(
  "🎉 *Congratulations!*\n\n" +
  "💰 *Bonus Received:* `" + bonusAmount + " INR`\n" +
  "💳 *New Balance:* `" + balance.value() + " INR`\n\n" +
  "⏰ Next bonus available after *24 Hours*.\n\n" +
  "🚀 Keep using the bot and earn more rewards!"
)
