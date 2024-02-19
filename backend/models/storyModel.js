import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 300,
    },
    cover: {
      type: String,
    },
    favorited: {
      type: Map,
      of: Boolean,
    },
    upvotes: {
      type: Map,
      of: Boolean,
    },
    downvotes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
