const Chats = require("../schema/Chats");
const { v4: uuidV4 } = require("uuid");
const addUser = ({ receiverEmail, senderEmail }, socket) => {
  // console.log(senderEmail);
  if (!receiverEmail || !senderEmail) {
    return { error: "user is required." };
  }

  const user = { receiverEmail, senderEmail };
  Chats.aggregate([
    {
      $match: {
        receiverEmail,
        senderEmail,
      },
    },
  ]).then((chat) => {
    console.log(chat);
  });
};

module.exports = { addUser };
