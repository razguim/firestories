import express from "express";
import { restricted,strictlyMod } from "../middleware/authMiddleware.js";

import {
    getReports,
    getStoryReports,
    getUserReports,
    reportUser,
    reportStory,
} from "../controllers/reportController.js";
const router = express.Router();

router.route("/").get(restricted,strictlyMod, getReports);
router.route("/stories").get(restricted,strictlyMod, getStoryReports);
router.route("/users").get(restricted,strictlyMod, getUserReports);
router.route("/story").post(restricted,strictlyMod,reportStory);
router.route("/user").post(restricted,strictlyMod, reportUser);


export default router;
