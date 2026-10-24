/*CMD
  command: 💸 Withdraw Funds
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

var minwith = parseFloat(10) //Minimum Withdraw in Place of 10

let stat = Bot.getProperty("" + user.telegramid + "?Ban")

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*")
} else {

  let balance = Libs.ResourcesLib.userRes("balance")
  var wallet = User.getProperty("wallet")

  var msg = ""

  if (!wallet) {
    msg = "*🗂 You Need To Setup Your wallet*"

  } else if (balance.value() < minwith) {
    msg = "*⚠ Must Own Atleast " + minwith + " INR To Make Withdrawal*"

  } else {
    msg = "*📤 Enter Amount of INR to Make Withdrawal*"
  }

  Api.sendAnimation({
    chat_id: chat.chatid,
    animation: "https://i.ibb.co/QjvRwZXL/giphy-1.gif",
    caption: msg,
    parse_mode: "Markdown"
  })

  if (wallet && balance.value() >= minwith) {
    Bot.runCommand("/withdraw2")
  }
}
