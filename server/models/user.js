import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      min: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



userSchema.statics.login = async function (email, password) {
  console.log(`Searching for user with email: ${email}`);
  const user = await this.findOne({ email });
  console.log(`User found: ${JSON.stringify(user)}`);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};


const User = mongoose.model("user", userSchema);

export default User;
