// import User from "../models/user.model.js";
// import ErrorHandler from "../utils/ErrorHandler.js";
// import AsyncHandler from "../utils/AsyncHandler.js";
// import JWT from "jsonwebtoken"


// const verifyUser = AsyncHandler(async (req, res, next) => {
//     try {
//         const accessToken = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ", "")

//         if (!accessToken) {
//             throw new ErrorHandler(401, "Unauthorised user!")
//         }

//         const decodedToken = JWT.verify(accessToken, process.env.TOKEN_SECRET)
//         const user = await User.findById(decodedToken?._id).select("-password")

//         if (!user) {
//             throw new ErrorHandler(401, "Unauthorised user!")
//         }

//         req.user = user
//         next()
//     } catch (error) {
//         throw new ErrorHandler(401, error?.message)
//     }
// })

// export default verifyUser



import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import JWT from "jsonwebtoken";

// 🔹 Verify if the user is authenticated
export const verifyUser = AsyncHandler(async (req, res, next) => {
    try {
        const accessToken =
            req?.cookies?.accessToken ||
            req?.header("Authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            throw new ErrorHandler(401, "Unauthorized user!");
        }

        const decodedToken = JWT.verify(accessToken, process.env.TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ErrorHandler(401, "Unauthorized user!");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ErrorHandler(401, error?.message);
    }
});

// 🔒 Restrict route access to admins only
export const verifyAdmin = AsyncHandler(async (req, res, next) => {
    if (req.user?.type !== "ADMIN") {
        throw new ErrorHandler(403, "Access denied. Admins only.");
    }
    next();
});


