import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controllers/jobsController.js";

//router object
const router = express.Router();

//routes
//Create Job || POST
router.post('/create-job', userAuth, createJobController)

//Get Job || Get
router.get('/get-job', userAuth, getAllJobsController)

//Update Job || PUT || PATCH
router.patch('/update-job/:id', userAuth, updateJobController)

//Delete Job || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController);

//Job Stats || GET
router.get('/job-stats', userAuth, jobStatsController);

//export
export default router;