const { addUser } = require("../helpers/misc");
const User = require("../schema/User");

module.exports = (io) => {
  io.on("connection", function (socket) {
    //* Get users */
    socket.on("getUsers", () => {
      User.find({}, (err, users) => {
        io.emit("getAllUsers", users);
        // console.log(users);
      });
      socket.on(
        "startUniqueChat",
        ({ receiverEmail, senderEmail, receiverID }, callback) => {
          addUser({ receiverEmail, senderEmail, receiverID }, socket);
        }
      );
    });
  });
};
