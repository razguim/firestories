import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    typeId: {
      type: Map,
      of: String,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
