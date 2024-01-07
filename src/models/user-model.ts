import mongoose, { Schema, model, connect } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Нууц үг заавал оруулна уу "],
    select: false,
  },
});

// 3. Create a Model.
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.checkPassword = async function (pass: string) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.getJsonWebToken = function () {
  let token = jwt.sign(
    { Id: this._id, role: this.role },
    "secretKey:as78dg78b2n903n290n9",
    {
      expiresIn: process.env.JWT_EXPIREDIN,
    }
  );
  return token;
};

export default mongoose.model("User", userSchema);
