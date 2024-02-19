import express from "express";
import { restricted } from "../middleware/authMiddleware.js";

import {
  createStory,
  updateStory,
  favoriteStory,
  upvoteStory,
  downvoteStory,
  deleteStory,
  getStories,
  getFeedStories,
  getUserFavorites,
  getStoryById,
} from "../controllers/storyController.js";
const router = express.Router();

router.route("/").get(restricted, getStories).post(restricted, createStory);
router.route("/feed").get(restricted, getFeedStories);
router.route("/favorites").get(restricted, getUserFavorites);
router
  .route("/:id")
  .get(restricted, getStoryById)
  .put(restricted, updateStory)
  .delete(restricted, deleteStory);
router.route("/favorite/:id").patch(restricted, favoriteStory);
router.route("/upvote/:id").patch(restricted, upvoteStory);
router.route("/downvote/:id").patch(restricted, downvoteStory);

export default router;
