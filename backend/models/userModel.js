const mongoose = require("mongoose");
//Imports the mongoose library which is used for MongoDB interactions.
const bcrypt = require("bcryptjs");
// Imports the bcryptjs library which is used for hashing passwords.

const userSchema = mongoose.Schema(
  //Defines the structure of the User document within the MongoDB collection.
  {
    name: { type: "String", required: true },
    //Stores the user's name. This field is required.
    email: { type: "String", unique: true, required: true },
    //Stores the user's email. This field is required and must be unique.
    password: { type: "String", required: true },
    //Stores the user's password. This field is required.
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    //Stores the URL of the user's profile picture. This field is required and has a default value.

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  //A boolean indicating if the user is an admin. This field is required and defaults to false.
  { timestaps: true }
 // Adds createdAt and updatedAt fields to the schema automatically, which track when the document was created and last updated.
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Adds a method to the schema to compare an entered password with the stored hashed password using bcrypt.compare.

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Adds a pre-save middleware to the schema to hash the password before saving the user document.
// This ensures that passwords are stored securely.

const User = mongoose.model("User", userSchema);
//Creates a Mongoose model named User based on the userSchema schema. 
//This model represents the collection and provides methods to interact with the data.

module.exports = User;
//Exports the User model so it can be used in other parts of the application, such as in routes or controllers.
