import express from "express";
import { restricted,mutualAcess,strictlyMod } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  loginUser,
  registerUser,
  createMod,
  getUserByUserName,
  getUserById,
  followUnfollowUser,
  updatetUserProfile,
  banUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";

router.get("/:username",restricted,mutualAcess,getUserByUserName);
router.post("/auth", loginUser);
router.patch("/follow/:username",restricted, followUnfollowUser);
router.post('/',registerUser);
router.post('/mod',restricted,strictlyMod,createMod);
router.route('/:id').delete(restricted,deleteUser).get(restricted,getUserById);
router.post("/logout", logoutUser);
router.patch("/ban",restricted,banUser)
router
  .route("/profile")
  .put(restricted, updatetUserProfile);

export default router;
