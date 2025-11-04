// import { Router } from "express";
// import { signup, login, logout } from "../controllers/user.controller.js";
// import verifyUser from "../middlewares/auth.middleware.js";

// const router = Router()

// router.route("/signup").post(signup)
// router.route("/login").post(login)
// router.route("/logout").post(verifyUser, logout)


// export default router


import { Router } from "express";
import { signup, login, logout, profile } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyUser, logout);
router.route("/profile").get(verifyUser, profile);

export default router;
