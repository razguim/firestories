import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import agenda from "../config/agenda.js";
import User from "../models/userModel.js";
import Story from "../models/storyModel.js";
import validator from "validator";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email) || validator.isEmpty(email)) {
    res.status(400);
    throw new Error("Unvalid Email");
  }
  const user = await User.findOne({ email: email }).exec();
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      isMod: user.isMod,
      isBanned: user.isBanned,
    });
  } else {
    res.status(401);
    throw new Error("Unvalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Unvalid Email");
  }
  if (
    validator.isEmpty(firstname) ||
    validator.isEmpty(lastname) ||
    validator.isEmpty(email) ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    res.status(400);
    throw new Error("Fields Empty, please fill required infos");
  }
  if (
    !(validator.isAlpha(firstname) ||
    validator.isAlpha(lastname))
  ) {
    res.status(400);
    throw new Error(
      "Your fullname must contains only letters "
    );
  }
  if (!validator.isAlphanumeric(username)) {
    res.status(400);
    throw new Error(
      "Username must contains only letters and numbers"
    );
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("Password must at least 8 characters and contain symbols");
  }

  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    avatar: "/uploads/defaultAvatar.jpg",
    password: req.body.password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      isMod: user.isMod,
      isBanned: user.isBanned,
    });
  } else {
    res.status(400);
    throw new Error("Unvalid user data");
  }
});
const createMod = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Unvalid Email");
  }
  if (
    validator.isEmpty(firstname) ||
    validator.isEmpty(lastname) ||
    validator.isEmpty(email) ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    res.status(400);
    throw new Error("Fields Empty, please fill required infos");
  }
  if (
    validator.isEmail(firstname) ||
    validator.isEmail(lastname) ||
    validator.isEmail(username)
  ) {
    res.status(400);
    throw new Error(
      "You can't put an email as your username or as your full name"
    );
  }
  if (!(validator.isStrongPassword(password,{
  minLength: 8,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
}))) {
    console.log(validator.isStrongPassword(password));
    res.status(400);
    throw new Error("Password must at least 8 characters and contain symbols");
  }

  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newModUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    avatar: "/uploads/defaultAvatar.jpg",
    password: req.body.password,
    isMod : true
  });
  if (newModUser) {
    generateToken(res, newModUser._id);
    res.status(201).json({
      _id: newModUser._id,
      firstname: newModUser.firstname,
      lastname: newModUser.lastname,
      username: newModUser.username,
      email: newModUser.email,
      avatar: newModUser.avatar,
      password: newModUser.password,
      isMod: newModUser.isMod,
      isBanned: newModUser.isBanned,
    });
  } else {
    res.status(400);
    throw new Error("Unvalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("fire", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    username: req.user.username,
    avatar: req.user.avatar,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const getUserByUserName = asyncHandler(async (req, res) => {
  const aUser = await User.findOne({ username: req.params.username })
    .populate({
      path: "stories",
      populate: {
        path: "postedBy",
        model: "User",
        select: "username _id avatar",
      },
      sort: { createdAt: -1 },
    })
    .populate({
      path: "followers",
      select: "avatar username firstname lastname _id",
    })
    .populate({
      path: "following",
      select: "avatar username firstname lastname _id",
    })
    .populate({
      path: "favorites",
      select: "_id title postedBy cover",
      populate: {
        path: "postedBy",
        model: "User",
        select: "username",
      },
    })
    .exec();
  if (aUser) {
    return res.status(201).json(aUser);
  } else {
    res.status(404);
    throw new Error(`${req.params.username} does not exist`);
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const aUser = await User.findOne({ _id: req.params.id }).select('-password').exec();

  if (aUser) {
    return res.status(201).json(aUser);
  } else {
    res.status(404);
    throw new Error(`User does not exist`);
  }
});

const followUnfollowUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).exec();
  const loggedUser = await User.findById(req.user._id).exec();
  if (user) {
    const isFollowed = user.followers.includes(loggedUser._id);
    if (isFollowed) {
      user.followers.pull(loggedUser._id);
      loggedUser.following.pull(user._id);
    } else {
      user.followers.push(loggedUser._id);
      loggedUser.following.push(user._id);
    }
    const followedUser= await user.save();
    await loggedUser.save();
    res.status(201).json(followedUser.followers.includes(loggedUser._id));
  } else {
    res.status(404);
    throw new Error({ message: "Resource not Found" });
  }
});

const updatetUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  if (user) {
    const { firstname, lastname, email, username,avatar, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Unvalid Email");
  }
  if (
    validator.isEmpty(firstname) ||
    validator.isEmpty(lastname) ||
    validator.isEmpty(email) ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    res.status(400);
    throw new Error("Fields Empty, please fill required infos");
  }
  if (
    validator.isEmail(firstname) ||
    validator.isEmail(lastname) ||
    validator.isEmail(username)
  ) {
    res.status(400);
    throw new Error(
      "You can't put an email as your username or as your full name"
    );
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("Password must at least 8 characters and contain symbols");
  }
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      password: updatedUser.password,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const banUser = asyncHandler(async (req, res) => {
  const { id:userId } = req.params;
  const { banDuration } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.isBanned = true;
    await user.save();
    agenda.define("Unban User", async (job) => {
      const user = await User.findById(userId);
      user.isBanned = false;
      await user.save();
    });
    (async function () {
      await agenda.start();
      await agenda.schedule(`in ${banDuration} days`, "Unban User");
    })();
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  if (user) {
    const userDeleted = await user.deleteOne({ _id: req.params.id });
    await Story.deleteMany({ postedBy: req.params.id });
    if (userDeleted) {
      res.status(201).json({ message: "User profile deleted" });
    }
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  loginUser,
  registerUser,
  createMod,
  getUserProfile,
  followUnfollowUser,
  getUserById,
  getUserByUserName,
  updatetUserProfile,
  banUser,
  deleteUser,
  logoutUser,
};
