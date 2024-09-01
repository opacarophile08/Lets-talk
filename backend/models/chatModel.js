const mongoose = require("mongoose");
//Imports the mongoose library which is used for MongoDB interactions.

const chatModel = mongoose.Schema(
  // Defines the structure of the Chat document within the MongoDB collection.
  {
    chatName: { type: String, trim: true },
    //stores the name of the chat. The trim option removes any leading or trailing whitespace.
    isGroupChat: { type: Boolean, default: false },
    // A boolean indicating if the chat is a group chat. Defaults to false.
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //An array of user IDs (references to the User model) who are participants in the chat.
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    //Stores the ID of the latest message in the chat, referencing the Message model.
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  //Stores the ID of the user who is the admin of the group chat, referencing the User model.
  { timestamps: true }
);
//Adds createdAt and updatedAt fields to the schema automatically, which track when the document was created and last updated.

const Chat = mongoose.model("Chat", chatModel);
/*
Creates a Mongoose model named Chat based on the chatModel schema. 
This model represents the collection and provides methods to interact with the data.
*/

module.exports = Chat;
//Exports the Chat model so it can be used in other parts of the application,
// such as in routes or controllers.
