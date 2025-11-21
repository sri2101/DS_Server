import { Router } from "express";
import { verifyUser, verifyAdmin } from "../middlewares/auth.middleware.js";
import {
  createPackage,
  getAllPackages,
  getPackagesByLocation,
  getPackageBySlug,
  updatePackage,
  deletePackage,
} from "../controllers/package.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Public
router.get("/all", getAllPackages);
router.get("/by-location", getPackagesByLocation);
router.get("/:slug", getPackageBySlug);

// Admin
router.post(
  "/create",
  verifyUser,
  verifyAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  createPackage
);

router.put(
  "/:slug",
  verifyUser,
  verifyAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  updatePackage
);
router.delete("/:slug", verifyUser, verifyAdmin, deletePackage);

export default router;
