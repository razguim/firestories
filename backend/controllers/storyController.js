import asyncHandler from "express-async-handler";
import Story from "../models/storyModel.js";
import User from "../models/userModel.js";

const getStories = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const searchQuery = req.query.searchQuery
    ? { title: { $regex: req.query.searchQuery, $options: "i" } }
    : {};
  const storiescount = await Story.countDocuments({ ...searchQuery });
  const stories = await Story.find({ ...searchQuery })
    .populate({
      path: "postedBy",
      select: "avatar username _id",
    })
    .sort({ upvotes: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();
  if (stories) {
    res
      .status(201)
      .json({ stories, page, pages: Math.ceil(storiescount / pageSize) });
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});
const getFeedStories = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  if (user) {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    if (user.following.length > 0) {
      const storiesCountQuery = await Promise.all(
        user.following.map((id) => Story.countDocuments({ postedBy: id }))
      );
      const storiescount = storiesCountQuery.reduce(function myFunc(
        total,
        num
      ) {
        return total + num;
      });
      const stories = await Promise.all(
        user.following.map((id) =>
          Story.find({ postedBy: id })
            .populate({
              path: "postedBy",
              select: "username _id avatar",
            })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec()
        )
      );
      const feedstories = stories.flat();

      res.json({
        feedstories,
        page,
        pages: Math.ceil(storiescount / pageSize),
      });
    } else {
      res.json({ message: "Follow users to get stories" });
    }
  } else {
    res.status(404);
    throw new error("User Not found");
  }
});
const getUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  if (user) {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    if (user.favorites.length > 0) {
      const storiesCountQuery = await Promise.all(
        user.favorites.map((id) => Story.countDocuments({ postedBy: id }))
      );
      const storiescount = storiesCountQuery.reduce(function myFunc(
        total,
        num
      ) {
        return total + num;
      });
      const stories = await Promise.all(
        user.favorites.map((id) =>
          Story.find({ _id: id })
            .populate({
              path: "postedBy",
              select: "username _id avatar",
            })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        )
      );
      const favoriteStories = stories.flat();
      res.json({
        favoriteStories,
        page,
        pages: Math.ceil(storiescount / pageSize),
      });
    } else {
      res.json({ message: "You haven't favorited any stories" });
    }
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
const getStoryById = asyncHandler(async (req, res) => {
  const aStory = await Story.findById(req.params.id)
    .populate({
      path: "postedBy",
      select: "_id avatar username",
    })
    .exec();
  if (aStory) {
    return res.status(201).json(aStory);
  } else {
    res.status(404);
    throw new Error("Story not Found");
  }
});

const createStory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.isBanned) {
    res.status(401);
    throw new Error("You can't post stories You Are Banned");
    
  }else{
    const story = new Story({
      title: req.body.title,
      content: req.body.content,
      cover: req.body.cover || "/uploads/defaultCover.jpg",
      postedBy: req.user._id,
      favorited: {},
      upvotes: {},
      downvotes: {},
    });
    const createdStory = await story.save();
    if (createdStory) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.stories.push(createdStory._id);
        await user.save();
      }
      res.status(201).json(createdStory);
    }
  }
});
const updateStory = asyncHandler(async (req, res) => {
  const { title, content, cover } = req.body;
  const story = await Story.findById(req.params.id);
  if (story) {
    story.title = title;
    story.content = content;
    story.cover = cover;
    const updatedStory = await story.save();
    res.status(201).json(updatedStory);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
const favoriteStory = asyncHandler(async (req, res) => {
  const {id:storyId} = req.params
  const story = await Story.findById(storyId);
  const user = await User.findById(req.user._id);
  if (user) {
    const isFavorited = Boolean(story.favorited.get(user._id));
    console.log(isFavorited);
    if (isFavorited) {
      story.favorited.delete(user._id);
      user.favorites.pull(storyId);
    } else {
      story.favorited.set(user._id, true);
      user.favorites.push(storyId);
    }
    const favoritedStory = await story.save();
    await user.save();
    res.status(201).json(Boolean(favoritedStory.favorited.get(user._id)));
  } else {
    res.status(404);
    throw new Error({ message: "Resource not Found" });
  }
});
const upvoteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  const isUpvoted = Boolean(story.upvotes.get(req.user._id));
  const isDownvoted = Boolean(story.downvotes.get(req.user._id));
  if (story) {
    if (isUpvoted) {
      story.upvotes.delete(req.user._id);
    } else if (isDownvoted) {
      story.downvotes.delete(req.user._id);
      story.upvotes.set(req.user._id, true);
    } else {
      story.upvotes.set(req.user._id, true);
    }

   const upvotedStory = await story.save();
    res.status(201).json(Boolean(upvotedStory.upvotes.get(req.user._id)));
  } else {
    res.status(404);
    throw new Error({ message: "Resource not Found" });
  }
});
const downvoteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  const isDownvoted = Boolean(story.downvotes.get(req.user._id));
  const isUpvoted = Boolean(story.upvotes.get(req.user._id));
  if (story) {
    if (isDownvoted) {
      story.downvotes.delete(req.user._id);
    } else if (isUpvoted) {
      story.upvotes.delete(req.user._id);
      story.downvotes.set(req.user._id, true);
    } else {
      story.downvotes.set(req.user._id, true);
    }

    const downvotedStory = await story.save();
    res.status(201).json(Boolean(downvotedStory.downvotes.get(req.user._id)));
  } else {
    res.status(404);
    throw new Error({ message: "Resource not Found" });
  }
});
const deleteStory = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id);

  const story = await Story.findById(req.params.id);
  if (story) {
    const deletedStory = await story.deleteOne({ _id: req.params.id });
    if (deletedStory) {
      await user.stories.pull(deletedStory._id);
    }
    res.status(201).json({ message: "Story deleted" });
  } else {
    res.status(404);
    throw new Error({ message: "Resource not Found" });
  }
});

export {
  getFeedStories,
  getUserFavorites,
  getStories,
  getStoryById,
  createStory,
  favoriteStory,
  upvoteStory,
  downvoteStory,
  updateStory,
  deleteStory,
};
