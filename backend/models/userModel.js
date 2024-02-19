import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min:3,
      
    },
    avatar: {
      type: String,
      default:'/uploads/defaultAvatar.jpg'
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    favorites:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    }],
    isMod: {
      type: Boolean,
      required: true,
      default:false
    },
    isBanned: {
      type: Boolean,
      required: true,
      default:false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
