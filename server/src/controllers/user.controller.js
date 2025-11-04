// import AsyncHandler from "../utils/AsyncHandler.js";
// import ErrorHandler from "../utils/ErrorHandler.js";
// import ResponseHandler from "../utils/ResponseHandler.js";
// import User from "../models/user.model.js";

// const isValidMobileNumber = (number) => {
//     const numStrings = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]
//     let flag = true

//     for (let i=0; i<number?.length; i++) {
//         if (!numStrings.includes(number[i])) {
//             flag = false
//             break
//         } 
//     }

//     return flag
// }


// // const signup = AsyncHandler(async (req, res) => {
// //     const {
// //         fullname,
// //         email,
// //         phone,
// //         password
// //     } = req.body

// //     if (!fullname || !email || !phone || !password) {
// //         throw new ErrorHandler(400, "All fields are required!")
// //     }

// //     if (fullname?.trim() === "") {
// //         return res
// //         .status(400)
// //         .json(
// //             new ErrorHandler(400, "Fullname shouldn't be empry!")
// //         )
// //     }

// //     if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)){
// //         throw new ErrorHandler(400, "Invalid email! :(")
// //     }

// //     if (phone?.trim() == "") {
// //         throw new ErrorHandler(400, "Incorrect mobile number! :(")
// //     }

// //     if (!(password?.trim()?.length > 7)) {
// //         throw new ErrorHandler(400, "Password must be 8 or more than 8 characters long!")
// //     }

// //     const isUserPresent = await User.findOne({
// //         $or: [
// //             {
// //                 email: email?.trim()
// //             },
// //             {
// //                 phone: phone?.trim()
// //             }
// //         ]
// //     })

// //     if (isUserPresent) {
// //         throw new ErrorHandler(400, "Account is already present! Go for login! :(")
// //     }

// //     const createdUser = await User.create(
// //         {
// //             fullname: fullname?.trim(),
// //             phone: phone?.trim(),
// //             email: email?.trim(),
// //             password: password?.trim()
// //         }
// //     )

// //     const isUserCreated = await User.findById(createdUser?._id)

// //     if (!isUserCreated) {
// //         throw new ErrorHandler(400, "Incorrect mobile number! :(")
// //     }

// //     return res
// //     .status(200)
// //     .json(
// //         new ResponseHandler(200, isUserCreated, "Account created successfully! :)")
// //     )
// // })

// const signup = AsyncHandler(async (req, res) => {
//   const { fullname, email, phone, password, type } = req.body;

//   if (!fullname || !email || !phone || !password) {
//     throw new ErrorHandler(400, "All fields are required!");
//   }

//   if (fullname?.trim() === "") {
//     return res
//       .status(400)
//       .json(new ErrorHandler(400, "Fullname shouldn't be empty!"));
//   }

//   if (
//     !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
//       email
//     )
//   ) {
//     throw new ErrorHandler(400, "Invalid email! :(");
//   }

//   if (phone?.trim() === "") {
//     throw new ErrorHandler(400, "Incorrect mobile number! :(");
//   }

//   if (!(password?.trim()?.length > 7)) {
//     throw new ErrorHandler(
//       400,
//       "Password must be 8 or more than 8 characters long!"
//     );
//   }

//   const isUserPresent = await User.findOne({
//     $or: [{ email: email?.trim() }, { phone: phone?.trim() }],
//   });

//   if (isUserPresent) {
//     throw new ErrorHandler(
//       400,
//       "Account is already present! Go for login! :("
//     );
//   }

//   const createdUser = await User.create({
//     fullname: fullname?.trim(),
//     phone: phone?.trim(),
//     email: email?.trim(),
//     password: password?.trim(),
//     type: type || "USER" // ✅ this line fixes your issue
//   });

//   const isUserCreated = await User.findById(createdUser?._id);

//   if (!isUserCreated) {
//     throw new ErrorHandler(400, "Something went wrong while creating user!");
//   }

//   return res
//     .status(200)
//     .json(
//       new ResponseHandler(200, isUserCreated, "Account created successfully! :)")
//     );
// });


// const login = AsyncHandler(async (req, res) => {
//     const { id, password } = req?.body

//     if (!id || !password) {
//         throw new ErrorHandler(400, "All fields are required!")
//     }

//     if (id?.trim() === "") {
//         throw new ErrorHandler(400, "Invalid Mobile no or Email!")
//     }

//     if (!(password?.trim().length > 7)) {
//         throw new ErrorHandler(400, "Password must be 8 or more than 8 characters long!")
//     }

//     const userData = await User.findOne({
//         $or: [
//             {
//                 email: id?.trim()
//             },
//             {
//                 phone: id?.trim()
//             }
//         ]
//     })

//     if (!userData) {
//         throw new ErrorHandler(400, "User not found! Go for account creation!")
//     }

//     const isValidPassword = await userData.validatePassword(password)

//     if (!isValidPassword) {
//         throw new ErrorHandler(400, "Invalid password!")
//     }

//     const accessToken = userData.generateToken()

//     const options = {
//         "httpOnly": true,
//         "secure": true
//     }

//     return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .json(
//         new ResponseHandler(200, {}, "User logged in successfully!")
//     )
// })

// const logout = AsyncHandler(async (req, res) => {
//     const options = {
//         "httpOnly": true,
//         "secure": true,
//         "sameSite": None,
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .json(
//         new ResponseHandler(200, {}, "User logged out successfully!")
//     )
// })


// export {
//     signup,
//     login,
//     logout
// }


import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import User from "../models/user.model.js";

// ✅ Utility function: validate mobile number
const isValidMobileNumber = (number) => {
  return /^[0-9]{10}$/.test(number); // Simple 10-digit check
};

// ✅ SIGNUP
const signup = AsyncHandler(async (req, res) => {
  console.log("📦 Received body:", req.body); // Debug log

  let { fullname, email, phone, password, type } = req.body || {};

  if (!fullname || !email || !phone || !password) {
    throw new ErrorHandler(400, "All fields are required!");
  }

  if (fullname.trim() === "") {
    throw new ErrorHandler(400, "Fullname shouldn't be empty!");
  }

  const emailRegex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(email)) {
    throw new ErrorHandler(400, "Invalid email format!");
  }

  if (!isValidMobileNumber(phone)) {
    throw new ErrorHandler(400, "Invalid mobile number!");
  }

  if (password.trim().length < 8) {
    throw new ErrorHandler(400, "Password must be at least 8 characters long!");
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.trim() }, { phone: phone.trim() }],
  });

  if (existingUser) {
    throw new ErrorHandler(400, "Account already exists! Please log in.");
  }

  // Normalize inputs
  fullname = fullname.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();
  password = password.trim();
  // Normalize type: accept case-insensitive 'ADMIN', otherwise default to 'USER'
  type = (type || "USER").toString().trim().toUpperCase();
  if (type !== "ADMIN") type = "USER";

  const createdUser = await User.create({
    fullname,
    email,
    phone,
    password,
    type, // normalized value
  });

  if (!createdUser) {
    throw new ErrorHandler(500, "Failed to create user.");
  }

  return res
    .status(201)
    .json(
      new ResponseHandler(201, createdUser, "Account created successfully!")
    );
});

// ✅ LOGIN
const login = AsyncHandler(async (req, res) => {
  const { id, password } = req.body || {};

  if (!id || !password) {
    throw new ErrorHandler(400, "All fields are required!");
  }

  const user = await User.findOne({
    $or: [{ email: id.trim() }, { phone: id.trim() }],
  });

  if (!user) {
    throw new ErrorHandler(404, "User not found! Please sign up first.");
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    throw new ErrorHandler(400, "Invalid password!");
  }

  const accessToken = user.generateToken();
  const options = {
    httpOnly: true,
    // In development we don't want `secure: true` because localhost is not https
    secure: process.env.NODE_ENV === 'production',
    sameSite: "None",
  };

  // send limited user info back (without password)
  const safeUser = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    type: user.type,
  };

  // Debug logs to help client-side troubleshooting
  console.log('login: found user doc ->', {
    _id: user._id?.toString?.(),
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    type: user.type,
  });
  console.log('login: sending safeUser ->', safeUser);

  // Return an explicit plain JSON object (avoid any class serialization differences)
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ statusCode: 200, data: { token: accessToken, user: safeUser }, message: "Login successful!" });
});

// ✅ LOGOUT
const logout = AsyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ResponseHandler(200, {}, "Logout successful!"));
});

export { signup, login, logout };

// ✅ PROFILE: returns the logged-in user (req.user set by verifyUser middleware)
const profile = AsyncHandler(async (req, res) => {
  const user = req.user; // verifyUser attaches user without password
  if (!user) throw new ErrorHandler(401, 'Unauthorized');
  return res.status(200).json({ statusCode: 200, data: user, message: 'Profile fetched' });
});

export { profile };






// import AsyncHandler from "../utils/AsyncHandler.js";
// import ErrorHandler from "../utils/ErrorHandler.js";
// import ResponseHandler from "../utils/ResponseHandler.js";
// import User from "../models/user.model.js";

// const signup = AsyncHandler(async (req, res) => {
//   let { fullname, email, phone, password, type } = req.body;

//   if (!fullname || !email || !phone || !password) {
//     throw new ErrorHandler(400, "All fields are required!");
//   }

//   // ✅ Normalize and sanitize input
//   fullname = fullname.trim();
//   email = email.trim().toLowerCase();
//   phone = phone.trim();
//   password = password.trim();
//   type = type?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER"; // ✅ Force valid value

//   if (fullname === "") throw new ErrorHandler(400, "Fullname shouldn't be empty!");

//   if (
//     !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
//       email
//     )
//   ) throw new ErrorHandler(400, "Invalid email! :(");

//   if (phone === "") throw new ErrorHandler(400, "Incorrect mobile number! :(");

//   if (!(password.length > 7))
//     throw new ErrorHandler(400, "Password must be 8 or more characters long!");

//   const isUserPresent = await User.findOne({
//     $or: [{ email }, { phone }],
//   });

//   if (isUserPresent) throw new ErrorHandler(400, "Account already exists! :(");

//   const createdUser = await User.create({
//     fullname,
//     email,
//     phone,
//     password,
//     type, // ✅ Properly sanitized
//   });

//   const isUserCreated = await User.findById(createdUser._id);

//   return res
//     .status(200)
//     .json(new ResponseHandler(200, isUserCreated, "Account created successfully! :)"));
// });

// export { signup };

