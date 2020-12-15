const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatsSchema = new Schema({
  roomID: { type: String, required: true },
  senderEmail: { type: String, required: true },
  receiverEmail: { type: String, required: true },
  txtMsg: { type: String, required: true },
  time: { type: String, default: Date.now },
});

module.exports = Chats = mongoose.model("chats", chatsSchema);
