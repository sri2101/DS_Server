// import { Router } from "express"
// import verifyUser from "../middlewares/auth.middleware.js"
// import upload from "../middlewares/multer.middleware.js"
// import {
//     createHotel,
//     toggleTwentyFourHourFrontDesk,
//     toggleACStatus,
//     toggleBarStatus,
//     toggleWifiStatus,
//     toggleBreakfastStatus,
//     toggleLaundryStatus,
//     toggleGymStatus,
//     toggleRestaurantStatus,
//     toggleSpaStatus,
//     toggleRoomServiceStatus,
//     toggleElevatorStatus,
//     toggleSecurityStatus,
//     toggleCCTVStatus,
//     toggleTravelDeskStatus,
//     togglePowerBackupStatus,
//     toggleCentralACStatus,
//     toggleInternetFacilityStatus,
//     toggleBanquetHallStatus,
//     toggleConferenceHallStatus,
//     togglePhotoCopyingStatus,
//     toggleBookWithZeroStatus,
//     toggleFreeBreakfastStatus,
//     toggleFreeParking,
//     toggleFreeCancellation,
//     getAllHotels,              
//     getHotelById,               
//     getHotelsByLocation 
// } from "../controllers/hotel.controller.js"

// const router = Router()

// router.use(verifyUser)

// router.route("/create").post(upload.fields([
//     {
//         name: "image1",
//         maxCount: 1
//     },
//     {
//         name: "image2",
//         maxCount: 1
//     },
//     {
//         name: "image3",
//         maxCount: 1
//     },
//     {
//         name: "image4",
//         maxCount: 1
//     },
//     {
//         name: "image5",
//         maxCount: 1
//     },
// ]), createHotel)
// router.route("/twenty_four_hour_front_desk/:_id").patch(toggleTwentyFourHourFrontDesk)
// router.route("/ac/:_id").patch(toggleACStatus)
// router.route("/bar/:_id").patch(toggleBarStatus)
// router.route("/wifi/:_id").patch(toggleWifiStatus)
// router.route("/breakfast/:_id").patch(toggleBreakfastStatus)
// router.route("/laundry/:_id").patch(toggleLaundryStatus)
// router.route("/gym/:_id").patch(toggleGymStatus)
// router.route("/restaurant/:_id").patch(toggleRestaurantStatus)
// router.route("/spa/:_id").patch(toggleSpaStatus)
// router.route("/roomService/:_id").patch(toggleRoomServiceStatus)
// router.route("/elevator/:_id").patch(toggleElevatorStatus)
// router.route("/security/:_id").patch(toggleSecurityStatus)
// router.route("/cctv/:_id").patch(toggleCCTVStatus)
// router.route("/travelDesk/:_id").patch(toggleTravelDeskStatus)
// router.route("/powerBackup/:_id").patch(togglePowerBackupStatus)
// router.route("/centralAC/:_id").patch(toggleCentralACStatus)
// router.route("/internetFacility/:_id").patch(toggleInternetFacilityStatus)
// router.route("/banquetHall/:_id").patch(toggleBanquetHallStatus)
// router.route("/conferenceHall/:_id").patch(toggleConferenceHallStatus)
// router.route("/photoCopying/:_id").patch(togglePhotoCopyingStatus)
// router.route("/bookWithZeroFee/:_id").patch(toggleBookWithZeroStatus)
// router.route("/freeBreakFast/:_id").patch(toggleFreeBreakfastStatus)
// router.route("/freeParking/:_id").patch(toggleFreeParking)
// router.route("/freeCancellation/:_id").patch(toggleFreeCancellation)
// router.route("/all").get(getAllHotels)
// router.route("/:_id").get(getHotelById)
// router.route("/location/:location").get(getHotelsByLocation)

// export default router



// import { Router } from "express";
// import { verifyUser, verifyAdmin } from "../middlewares/auth.middleware.js";
// import upload from "../middlewares/multer.middleware.js";
// import {
//     createHotel,
//     toggleTwentyFourHourFrontDesk,
//     toggleACStatus,
//     toggleBarStatus,
//     toggleWifiStatus,
//     toggleBreakfastStatus,
//     toggleLaundryStatus,
//     toggleGymStatus,
//     toggleRestaurantStatus,
//     toggleSpaStatus,
//     toggleRoomServiceStatus,
//     toggleElevatorStatus,
//     toggleSecurityStatus,
//     toggleCCTVStatus,
//     toggleTravelDeskStatus,
//     togglePowerBackupStatus,
//     toggleCentralACStatus,
//     toggleInternetFacilityStatus,
//     toggleBanquetHallStatus,
//     toggleConferenceHallStatus,
//     togglePhotoCopyingStatus,
//     toggleBookWithZeroStatus,
//     toggleFreeBreakfastStatus,
//     toggleFreeParking,
//     toggleFreeCancellation,
//     getAllHotels,
//     getHotelById,
//     getHotelsByLocation
// } from "../controllers/hotel.controller.js";

// const router = Router();

// /* ======================================================
//    🔒 ADMIN-ONLY ROUTES (Protected by JWT + Role Check)
// ====================================================== */
// router.post(
//     "/create",
//     verifyUser,
//     verifyAdmin,
//     upload.fields([
//         { name: "image1", maxCount: 1 },
//         { name: "image2", maxCount: 1 },
//         { name: "image3", maxCount: 1 },
//         { name: "image4", maxCount: 1 },
//         { name: "image5", maxCount: 1 },
//     ]),
//     createHotel
// );

// // Admin-only feature toggles
// router.patch("/twenty_four_hour_front_desk/:_id", verifyUser, verifyAdmin, toggleTwentyFourHourFrontDesk);
// router.patch("/ac/:_id", verifyUser, verifyAdmin, toggleACStatus);
// router.patch("/bar/:_id", verifyUser, verifyAdmin, toggleBarStatus);
// router.patch("/wifi/:_id", verifyUser, verifyAdmin, toggleWifiStatus);
// router.patch("/breakfast/:_id", verifyUser, verifyAdmin, toggleBreakfastStatus);
// router.patch("/laundry/:_id", verifyUser, verifyAdmin, toggleLaundryStatus);
// router.patch("/gym/:_id", verifyUser, verifyAdmin, toggleGymStatus);
// router.patch("/restaurant/:_id", verifyUser, verifyAdmin, toggleRestaurantStatus);
// router.patch("/spa/:_id", verifyUser, verifyAdmin, toggleSpaStatus);
// router.patch("/roomService/:_id", verifyUser, verifyAdmin, toggleRoomServiceStatus);
// router.patch("/elevator/:_id", verifyUser, verifyAdmin, toggleElevatorStatus);
// router.patch("/security/:_id", verifyUser, verifyAdmin, toggleSecurityStatus);
// router.patch("/cctv/:_id", verifyUser, verifyAdmin, toggleCCTVStatus);
// router.patch("/travelDesk/:_id", verifyUser, verifyAdmin, toggleTravelDeskStatus);
// router.patch("/powerBackup/:_id", verifyUser, verifyAdmin, togglePowerBackupStatus);
// router.patch("/centralAC/:_id", verifyUser, verifyAdmin, toggleCentralACStatus);
// router.patch("/internetFacility/:_id", verifyUser, verifyAdmin, toggleInternetFacilityStatus);
// router.patch("/banquetHall/:_id", verifyUser, verifyAdmin, toggleBanquetHallStatus);
// router.patch("/conferenceHall/:_id", verifyUser, verifyAdmin, toggleConferenceHallStatus);
// router.patch("/photoCopying/:_id", verifyUser, verifyAdmin, togglePhotoCopyingStatus);
// router.patch("/bookWithZeroFee/:_id", verifyUser, verifyAdmin, toggleBookWithZeroStatus);
// router.patch("/freeBreakFast/:_id", verifyUser, verifyAdmin, toggleFreeBreakfastStatus);
// router.patch("/freeParking/:_id", verifyUser, verifyAdmin, toggleFreeParking);
// router.patch("/freeCancellation/:_id", verifyUser, verifyAdmin, toggleFreeCancellation);

// /* ======================================================
//    🌍 PUBLIC ROUTES (Anyone can access)
// ====================================================== */
// router.get("/all", getAllHotels);
// router.get("/:_id", getHotelById);
// router.get("/location/:location", getHotelsByLocation);

// export default router;



import { Router } from "express";
import { verifyUser, verifyAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    toggleAmenity,
    getAllHotels,
    getHotelById,
    getHotelsByLocation
} from "../controllers/hotel.controller.js";

const router = Router();

/* ======================================================
   🔒 ADMIN-ONLY ROUTES (Protected by JWT + Role Check)
====================================================== */

// Create hotel with images
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
    createHotel
);

// Update hotel (Edit)
router.put(
    "/:id",
    verifyUser,
    verifyAdmin,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
        { name: "image5", maxCount: 1 },
    ]),
    updateHotel
);

// Delete hotel
router.delete("/:id", verifyUser, verifyAdmin, deleteHotel);

// Generic amenity or top-level field toggle
// Example: PUT /api/admin/hotels/toggle/:id/ac
router.put("/toggle/:id/:amenity", verifyUser, verifyAdmin, toggleAmenity);

/* ======================================================
   🌍 PUBLIC ROUTES (Anyone can access)
====================================================== */
router.get("/all", getAllHotels);
router.get("/:_id", getHotelById);
router.get("/location/:location", getHotelsByLocation);

export default router;
