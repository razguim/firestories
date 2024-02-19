import asyncHandler from "express-async-handler";
import Report from "../models/reportModel.js";
import User from "../models/userModel.js";

const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().exec();
  const storyReports = await Report.find({
    "typeId.story": {
      $exists: true,
    },
  }).populate({path:"typeId.story"}).exec();
  const storyTypeIds = [];
  const userTypeIds = [];
  reports.forEach(report => {
      for (const [key, value] of report.typeId.entries()) {
        if(key === 'story'){

          storyTypeIds.push(value);
        }
        if(key === 'user'){

          userTypeIds.push(value);
        }
        
      }
    });
  console.log(userTypeIds);
  console.log(storyTypeIds);
  const userReports = await Report.find({
    "typeId.user": {
      $exists: true,
    },
  }).populate({path:"typeId.story"}).exec();

  if (reports) {

    res.status(201).json(reports);
  } else {
    res.status(404);
    throw new Error("No reports found");
  }

});
const getStoryReports = asyncHandler(async (req, res) => {
  const storyReports = await Report.find({
    "typeId.story": {
      $exists: true,
    },
  }).populate({path:"typeId.story"}).exec();
  
  if (storyReports) {
    res.status(201).json(storyReports);
  } else {
    res.status(404);
    throw new Error("No stories reports Found");
  }
});
const getUserReports = asyncHandler(async (req, res) => {
  const userReports = await Report.find({
    "typeId.user": {
      $exists: true,
    },
  }).exec();
  if (userReports) {
    res.status(201).json(userReports);
  } else {
    res.status(404);
    throw new Error("No users reports Found");
  }
});
const reportUser = asyncHandler(async (req, res) => {
  const storyReport = await Report.create({
    typeId:{user:req.body.username},
    reason: req.body.reason,
  });
  await storyReport.save();
  res.status(201).json("Report Sent");
});
const reportStory = asyncHandler(async (req, res) => {
  const storyReport = await Report.create({
    typeId:{story:req.body.storyId},
    reason: req.body.reason,
  });
  await storyReport.save();
  res.status(201).json("Report Sent");
});

export { getReports, getStoryReports, getUserReports, reportUser, reportStory };
