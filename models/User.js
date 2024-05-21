const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, " ."],
    unique: true,
    lowercase: true,
    validate: [isEmail, " ."],
  },
  password: {
    type: String,
    required: [true, " ."],
  },
});
userSchema.statics.signUp = async function (email, password) {
  const salt = await bcrypt.genSalt();
  console.log(salt);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashedPassword });
    return {
      _id: user._id,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user.visibleUser;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    _id: doc._id,
    email: doc.email,
  };
});
const User = mongoose.model("user", userSchema);
module.exports = User;
