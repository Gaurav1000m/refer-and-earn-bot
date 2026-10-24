/*CMD
  command: /setwallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: *✏️ Now Send Your Upi Id 🆔 To Use It For Future Withdrawals*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Check @ sign
if(!message.includes("@")){
  Bot.sendMessage(
    "❌ *Invalid UPI ID!*\n" +
    "_Your UPI ID must contain '@' symbol._\n\n" +
    "✔ Example:\n`name@oksbi`\n`1234567890@okaxis`",
    { parse_mode: "Markdown" }
  )
  return
}

// Save UPI ID
User.setProperty("wallet", message, "string")

// Confirmation message
Bot.sendMessage(
  "*💠 UPI ID Saved Successfully!*\n\n" +
  "🔗 *Your UPI:* `" + message + "`",
  { parse_mode: "Markdown" }
)
