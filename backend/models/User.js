import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// this method should be available on this model's instance e.g. await User.findUsername("john")
UserSchema.methods.comparePass = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password);
};

// this is available as new User().getUsername;
UserSchema.virtual("getUsername").get(function () {
  return this.username + " " + Math.random().toString(32).substring(2);
});

// this is available on document itself e.g. User.
UserSchema.statics.findUserName = function (username) {
  return this.find({ username: new RegExp(username, "i") });
};

// User.findOne().byName("john").exec((err, animal) => console.log(animal));
UserSchema.query.byUsername = function (name) {
  return this.where({ username: new RegExp(name, "i") });
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = model("User", UserSchema);

export { User };
