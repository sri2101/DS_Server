import express from "express";
import { submitTripEnquiry } from "../controllers/tripEnquiry.controller.js";

const router = express.Router();

router.post("/submit", submitTripEnquiry);

export default router;
