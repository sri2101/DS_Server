// import ErrorHandler from "../utils/ErrorHandler.js";
// import ResponseHandler from "../utils/ResponseHandler.js"
// import AsyncHandler from "../utils/AsyncHandler.js";
// import Hotels from "../models/hotels.model.js";
// import uploadOnCloudinary from "../utils/cloudinary.js";

// const createHotel = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }
//     const {
//         name, location, descriptionAboutHotel, originalPrice, discount, bookWithZero, freeBreakfast, freeParking, freeCancellation, twentyFourHourFrontDesk, ac, bar, wifi, breakfast, laundry, gym,
//     } = req?.body

//     if (!name || !location || !descriptionAboutHotel || !originalPrice || !discount) {
//         throw new ErrorHandler(400, "All fields are required!")
//     }

//     if (name?.trim() === "") {
//         throw new ErrorHandler(400, "Hotel name should not be empty!")
//     }

//     if (location?.trim() === "") {
//         throw new ErrorHandler(400, "Hotel location is empty!")
//     }

//     if (descriptionAboutHotel?.trim() === "") {
//         throw new ErrorHandler(400, "Hotel description is empty!")
//     }

//     if (Number(originalPrice) <= 0) {
//         throw new ErrorHandler(400, "Price should be more than 0!")
//     }

//     if (Number(discount) < 0) {
//         throw new ErrorHandler(400, "Invalid discount amount!")
//     }

//     if (Number(discount) > Number(originalPrice)) {
//         throw new ErrorHandler(400, "Discount price should not exceed from original price!")
//     }

//     let images = {
//         "image1": req?.files?.image1 ? req?.files?.image1[Number(0)]?.path : "",
//         "image2": req?.files?.image2 ? req?.files?.image2[Number(0)]?.path : "",
//         "image3": req?.files?.image3 ? req?.files?.image3[Number(0)]?.path : "",
//         "image4": req?.files?.image4 ? req?.files?.image4[Number(0)]?.path : "",
//         "image5": req?.files?.image5 ? req?.files?.image5[Number(0)]?.path : "",
//     }

//     let secureImageUrls = {
//         "image1": images?.image1 ? await uploadOnCloudinary(images?.image1) : "",
//         "image2": images?.image2 ? await uploadOnCloudinary(images?.image2) : "",
//         "image3": images?.image3 ? await uploadOnCloudinary(images?.image3) : "",
//         "image4": images?.image4 ? await uploadOnCloudinary(images?.image4) : "",
//         "image5": images?.image5 ? await uploadOnCloudinary(images?.image5) : "",
//     }

//     const hotel = await Hotels.create({
//         name: name?.trim(),
//         location: location?.trim(),
//         descriptionAboutHotel: descriptionAboutHotel?.trim(),
//         originalPrice: Number(originalPrice),
//         priceAfterDiscount: !discount ? 0 : Number(originalPrice) - Number(discount),
//         image1: secureImageUrls?.image1 ? secureImageUrls?.image1 : "",
//         image2: secureImageUrls?.image2 ? secureImageUrls?.image2 : "",
//         image3: secureImageUrls?.image3 ? secureImageUrls?.image3 : "",
//         image4: secureImageUrls?.image4 ? secureImageUrls?.image4 : "",
//         image5: secureImageUrls?.image5 ? secureImageUrls?.image5 : "",
//         createdBy: req?.user?._id
//     })

//     const isHotelCreated = await Hotels.findById(hotel?._id)

//     if (!isHotelCreated) {
//         throw new ErrorHandler(500, "Something went wrong while uploading hotel data!")
//     }

//     return res
//         .status(201)
//         .json(
//             new ResponseHandler(200, isHotelCreated, "Hotel data created successfully!")
//         )
// })

// const toggleTwentyFourHourFrontDesk = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.twentyFourHourFrontDesk = !hotelData.amenities.twentyFourHourFrontDesk
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "Twenty Four Hour Front Desk status toggled!")
//         )
// })

// const toggleACStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.ac = !hotelData.amenities.ac
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "AC status toggled!")
//         )
// })

// const toggleBarStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.bar = !hotelData.amenities.bar
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "Bar status toggled!")
//         )
// })

// const toggleWifiStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.wifi = !hotelData.amenities.wifi
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "wifi status toggled!")
//         )
// })

// const toggleBreakfastStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.breakfast = !hotelData.amenities.breakfast
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "breakfast status toggled!")
//         )
// })

// const toggleLaundryStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.laundry = !hotelData.amenities.laundry
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "laundry status toggled!")
//         )
// })

// const toggleGymStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.gym = !hotelData.amenities.gym
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "gym status toggled!")
//         )
// })

// const toggleRestaurantStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.restaurant = !hotelData.amenities.restaurant
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "restaurant status toggled!")
//         )
// })

// const toggleSpaStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.spa = !hotelData.amenities.spa
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "spa status toggled!")
//         )
// })

// const toggleRoomServiceStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.roomService = !hotelData.amenities.roomService
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "roomService status toggled!")
//         )
// })

// const toggleElevatorStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.elevator = !hotelData.amenities.elevator
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "elevator status toggled!")
//         )
// })

// const toggleSecurityStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.security = !hotelData.amenities.security
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "security status toggled!")
//         )
// })

// const toggleTravelDeskStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.travelDesk = !hotelData.amenities.travelDesk
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "travelDesk status toggled!")
//         )
// })

// const togglePowerBackupStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.powerBackup = !hotelData.amenities.powerBackup
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "powerBackup status toggled!")
//         )
// })

// const toggleCentralACStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.centralAc = !hotelData.amenities.centralAc
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "centralAc status toggled!")
//         )
// })

// const toggleCCTVStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.cctv = !hotelData.amenities.cctv
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "cctv status toggled!")
//         )
// })

// const toggleInternetFacilityStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.internetFacility = !hotelData.amenities.internetFacility
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "internetFacility status toggled!")
//         )
// })

// const toggleBanquetHallStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.banquetHall = !hotelData.amenities.banquetHall
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "banquetHall status toggled!")
//         )
// })

// const toggleConferenceHallStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.conferenceHall = !hotelData.amenities.conferenceHall
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "conferenceHall status toggled!")
//         )
// })

// const togglePhotoCopyingStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.amenities.photoCopying = !hotelData.amenities.photoCopying
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "photoCopying status toggled!")
//         )
// })

// const toggleBookWithZeroStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.bookWithZero = !hotelData.bookWithZero
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "bookWithZero status toggled!")
//         )
// })

// const toggleFreeBreakfastStatus = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.freeBreakfast = !hotelData.freeBreakfast
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "freeBreakfast status toggled!")
//         )
// })

// const toggleFreeParking = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.freeParking = !hotelData.freeParking
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "freeParking status toggled!")
//         )
// })

// const toggleFreeCancellation = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") {
//         throw new ErrorHandler(401, "Unauthorised user!")
//     }

//     const { _id } = req?.params

//     const hotelData = await Hotels.findById(_id)

//     if (!hotelData) {
//         throw new ErrorHandler(400, "Hotel not found! Invalid hotel id!")
//     }

//     hotelData.freeCancellation = !hotelData.freeCancellation
//     await hotelData.save()

//     return res
//         .status(200)
//         .json(
//             new ResponseHandler(200, {}, "freeCancellation status toggled!")
//         )
// })

// // ✅ Get all hotels
// const getAllHotels = AsyncHandler(async (req, res) => {
//     const hotels = await Hotels.find()
//     return res
//         .status(200)
//         .json(new ResponseHandler(200, hotels, "All hotels fetched successfully!"))
// })

// // ✅ Get hotel by ID
// const getHotelById = AsyncHandler(async (req, res) => {
//     const { _id } = req.params
//     const hotel = await Hotels.findById(_id)

//     if (!hotel) throw new ErrorHandler(404, "Hotel not found!")

//     return res
//         .status(200)
//         .json(new ResponseHandler(200, hotel, "Hotel details fetched successfully!"))
// })

// // ✅ Get hotels by location
// const getHotelsByLocation = AsyncHandler(async (req, res) => {
//     const { location } = req.params
//     const hotels = await Hotels.find({
//         location: { $regex: new RegExp(location, "i") }
//     })

//     if (!hotels.length) {
//         throw new ErrorHandler(404, "No hotels found in this location!")
//     }

//     return res
//         .status(200)
//         .json(new ResponseHandler(200, hotels, "Hotels fetched successfully by location!"))
// })


// export {
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
// }




// import ErrorHandler from "../utils/ErrorHandler.js";
// import ResponseHandler from "../utils/ResponseHandler.js";
// import AsyncHandler from "../utils/AsyncHandler.js";
// import Hotels from "../models/hotels.model.js";
// import uploadOnCloudinary from "../utils/cloudinary.js";

// // ✅ Create Hotel
// const createHotel = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") throw new ErrorHandler(401, "Unauthorised user!");

//     // Debug logging
//     console.log("[createHotel] req.body:", JSON.stringify(req.body));
//     console.log("[createHotel] req.files keys:", Object.keys(req.files || {}));

//     // normalize amenities coming from form-data / JSON before validation/creation
//     req.body.amenities = normalizeAmenities(req.body);
//     console.log("[createHotel] normalized amenities:", req.body.amenities);

//     const {
//         name, location, descriptionAboutHotel, originalPrice, discount,
//         bookWithZero, freeBreakfast, freeParking, freeCancellation,
//         // amenity fields are now read from req.body.amenities
//     } = req?.body;

//     // ✅ Validation
//     if (!name || !location || !descriptionAboutHotel || !originalPrice || discount === undefined) {
//         throw new ErrorHandler(400, "All fields are required!");
//     }
//     if (name.trim() === "") throw new ErrorHandler(400, "Hotel name should not be empty!");
//     if (location.trim() === "") throw new ErrorHandler(400, "Hotel location is empty!");
//     if (descriptionAboutHotel.trim() === "") throw new ErrorHandler(400, "Hotel description is empty!");
//     if (Number(originalPrice) <= 0) throw new ErrorHandler(400, "Price should be more than 0!");
//     if (Number(discount) < 0) throw new ErrorHandler(400, "Invalid discount amount!");
//     if (Number(discount) > Number(originalPrice)) throw new ErrorHandler(400, "Discount price should not exceed original price!");

//     // ✅ Images
//     const images = {
//         image1: req?.files?.image1?.[0]?.path || "",
//         image2: req?.files?.image2?.[0]?.path || "",
//         image3: req?.files?.image3?.[0]?.path || "",
//         image4: req?.files?.image4?.[0]?.path || "",
//         image5: req?.files?.image5?.[0]?.path || "",
//     };

//     const secureImageUrls = {
//         image1: images.image1 ? await uploadOnCloudinary(images.image1) : "",
//         image2: images.image2 ? await uploadOnCloudinary(images.image2) : "",
//         image3: images.image3 ? await uploadOnCloudinary(images.image3) : "",
//         image4: images.image4 ? await uploadOnCloudinary(images.image4) : "",
//         image5: images.image5 ? await uploadOnCloudinary(images.image5) : "",
//     };

//     // ✅ Create Hotel
//     const hotel = await Hotels.create({
//         name: name.trim(),
//         location: location.trim(),
//         descriptionAboutHotel: descriptionAboutHotel.trim(),
//         originalPrice: Number(originalPrice),
//         priceAfterDiscount: Number(originalPrice) - Number(discount),
//         image1: secureImageUrls.image1,
//         image2: secureImageUrls.image2,
//         image3: secureImageUrls.image3,
//         image4: secureImageUrls.image4,
//         image5: secureImageUrls.image5,
//         // use normalized amenities object
//         amenities: req.body.amenities || {},
//         bookWithZero,
//         freeBreakfast,
//         freeParking,
//         freeCancellation,
//         createdBy: req?.user?._id
//     });

//     const isHotelCreated = await Hotels.findById(hotel?._id);
//     if (!isHotelCreated) throw new ErrorHandler(500, "Something went wrong while uploading hotel data!");

//     return res.status(201).json(new ResponseHandler(200, isHotelCreated, "Hotel data created successfully!"));
// });

// // ✅ Update Hotel
// const updateHotel = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") throw new ErrorHandler(401, "Unauthorised user!");
//     const id = req.params.id || req.params._id;
//     if (!id) {
//         console.error("[updateHotel] ID is undefined or invalid.");
//         throw new ErrorHandler(400, "Invalid hotel ID.");
//     }
//     console.log("[updateHotel] Querying hotel with ID:", id);
//     const hotel = await Hotels.findById(id);
//     console.log("[updateHotel] Query result:", hotel);
//     if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

//     console.log("[updateHotel] req.params:", req.params);

//     // normalize amenities on update as well
//     if (Object.keys(req.body || {}).length) {
//       req.body.amenities = normalizeAmenities(req.body);
//       console.log("[updateHotel] normalized amenities:", req.body.amenities);
//     }

//     // Merge incoming data
//     Object.assign(hotel, req.body);

//     // Handle images update if provided
//     for (let i = 1; i <= 5; i++) {
//         const key = `image${i}`;
//         if (req.files?.[key]?.[0]?.path) {
//             hotel[key] = await uploadOnCloudinary(req.files[key][0].path);
//         }
//     }

//     await hotel.save();
//     return res.status(200).json(new ResponseHandler(200, hotel, "Hotel updated successfully!"));
// });

// // ✅ Delete Hotel
// const deleteHotel = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") throw new ErrorHandler(401, "Unauthorised user!");
//     const id = req.params.id || req.params._id;
//     const hotel = await Hotels.findByIdAndDelete(id);
//     if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

//     return res.status(200).json(new ResponseHandler(200, {}, "Hotel deleted successfully!"));
// });

// // ✅ Generic Amenity Toggle
// const toggleAmenity = AsyncHandler(async (req, res) => {
//     if (req?.user?.type === "USER") throw new ErrorHandler(401, "Unauthorised user!");
//     const amenity = req.params.amenity;
//     const id = req.params.id || req.params._id;
//     const hotel = await Hotels.findById(id);
//     if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

//     // Handle nested amenities or top-level fields
//     if (hotel.amenities?.hasOwnProperty(amenity)) {
//         hotel.amenities[amenity] = !hotel.amenities[amenity];
//     } else if (hotel.hasOwnProperty(amenity)) {
//         hotel[amenity] = !hotel[amenity];
//     } else {
//         throw new ErrorHandler(400, "Invalid amenity field!");
//     }

//     await hotel.save();
//     return res.status(200).json(new ResponseHandler(200, {}, `${amenity} status toggled!`));
// });

// // ✅ Get All Hotels
// const getAllHotels = AsyncHandler(async (req, res) => {
//     const hotels = await Hotels.find();
//     return res.status(200).json(new ResponseHandler(200, hotels, "All hotels fetched successfully!"));
// });

// // ✅ Get Hotel by ID
// const getHotelById = AsyncHandler(async (req, res) => {
//     const id = req.params._id || req.params.id;
//     const hotel = await Hotels.findById(id);
//     if (!hotel) throw new ErrorHandler(404, "Hotel not found!");
//     return res.status(200).json(new ResponseHandler(200, hotel, "Hotel details fetched successfully!"));
// });

// // ✅ Get Hotels by Location
// const getHotelsByLocation = AsyncHandler(async (req, res) => {
//     const { location } = req.params;
//     const hotels = await Hotels.find({ location: { $regex: new RegExp(location, "i") } });
//     if (!hotels.length) throw new ErrorHandler(404, "No hotels found in this location!");
//     return res.status(200).json(new ResponseHandler(200, hotels, "Hotels fetched successfully by location!"));
// });

// // normalize amenities coming from multipart/form-data or JSON body
// const normalizeAmenities = (body) => {
//   const AMENITY_KEYS = [
//     "twentyFourHourFrontDesk","ac","bar","wifi","breakfast","laundry","gym",
//     "restaurant","spa","roomService","elevator","security","travelDesk",
//     "powerBackup","centralAc","cctv","internetFacility","banquetHall",
//     "conferenceHall","photoCopying"
//   ];

//   const parseBool = (v) => {
//     if (v === true || v === false) return v;
//     if (typeof v === "number") return v !== 0;
//     if (typeof v === "string") {
//       const s = v.trim().toLowerCase();
//       if (s === "true" || s === "1") return true;
//       if (s === "false" || s === "0" || s === "") return false;
//     }
//     return false;
//   };

//   let amenities = {};

//   // 1) If body.amenities is a JSON string, parse it
//   if (body.amenities && typeof body.amenities === "string") {
//     try {
//       const parsed = JSON.parse(body.amenities);
//       if (parsed && typeof parsed === "object") amenities = { ...amenities, ...parsed };
//     } catch (e) {
//       // ignore
//     }
//   }

//   // 2) If body.amenities is an object (multer may produce nested object),
//   //    merge its keys (also handle the case where body.amenities[""] holds a JSON string)
//   if (body.amenities && typeof body.amenities === "object") {
//     Object.keys(body.amenities).forEach((k) => {
//       const v = body.amenities[k];
//       if (k === "" && typeof v === "string") {
//         // some parsers put the raw JSON string at key ""
//         try {
//           const parsed = JSON.parse(v);
//           if (parsed && typeof parsed === "object") amenities = { ...amenities, ...parsed };
//         } catch (e) {
//           // ignore
//         }
//       } else {
//         amenities[k] = v;
//       }
//     });
//   }

//   // 3) Pick up bracketed fields like amenities[wifi] = "true" from top-level body
//   Object.keys(body).forEach((k) => {
//     const m = k.match(/^amenities\[(.+)\]$/);
//     if (m) {
//       const key = m[1];
//       amenities[key] = body[k];
//     }
//   });

//   // 4) Coerce values and ensure all known keys exist
//   const result = {};
//   AMENITY_KEYS.forEach((key) => {
//     if (amenities.hasOwnProperty(key)) result[key] = parseBool(amenities[key]);
//     else result[key] = false;
//   });

//   return result;
// };

// export {
//     createHotel,
//     updateHotel,
//     deleteHotel,
//     toggleAmenity,
//     getAllHotels,
//     getHotelById,
//     getHotelsByLocation
// };



import Hotels from "../models/hotels.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// Helper - robust boolean parser for form-data values
const parseBoolean = (v) => {
  if (v === true || v === false) return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "1") return true;
    return false;
  }
  return false;
};

// Helper - normalize multipart/form-data bracketed fields and JSON strings
// Accepts a value that might be:
// - a JSON string (array or object)
// - an object of numeric keys (e.g. { '0': {...}, '1': {...} })
// - an object with nested numeric keys for arrays
// - already an array
// Returns a normalized array or object depending on target shape
const normalizeMultipartField = (raw) => {
  if (raw === undefined || raw === null) return undefined;

  // If it's already an array, ensure inner items are normalized
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === "string") {
        try { return JSON.parse(item); } catch (e) { return item; }
      }
      return item;
    });
  }

  // If it's a string, try JSON.parse
  if (typeof raw === "string") {
    const s = raw.trim();
    if (s === "" ) return undefined;
    try {
      const parsed = JSON.parse(s);
      return normalizeMultipartField(parsed);
    } catch (e) {
      // Not JSON, return string as-is (caller may coerce)
      return raw;
    }
  }

  // If it's an object with numeric keys -> convert to array
  if (typeof raw === "object") {
    const keys = Object.keys(raw);
    // Common multer shape: { '0': {...}, '1': {...} }
    const allNumeric = keys.length && keys.every(k => /^\d+$/.test(k));
    if (allNumeric) {
      const arr = [];
      keys.sort((a,b) => Number(a) - Number(b)).forEach(k => {
        arr.push(normalizeMultipartField(raw[k]));
      });
      return arr;
    }

    // Some parsers put the raw JSON string at key ""
    if (raw.hasOwnProperty("") && typeof raw[""] === 'string') {
      try { return normalizeMultipartField(JSON.parse(raw[''])); } catch (e) { /* ignore */ }
    }

    // If the object looks like a description element { place: '', info: { '0': 'a' } }
    // normalize nested numeric `info` keys into an array
    const out = { ...raw };
    if (out.info && typeof out.info === 'object' && !Array.isArray(out.info)) {
      out.info = normalizeMultipartField(out.info) || [];
    }
    return out;
  }

  return raw;
};

/* ======================================================
   🏨 CREATE HOTEL (Admin)
====================================================== */
export const createHotel = AsyncHandler(async (req, res) => {
  // Extract all possible fields from request body
  const {
    // Basic Info
    name, city, location, starCategory, star, budget,
    // Ratings & Reviews
    rating, reviewLabel, reviewCount,
    // Pricing & Offers
    price, originalPrice, tax, initialAmount, discount, promocode,
    // Booking & Availability
    availableFrom, availableTo, day, night, rooms, guests, people, perk, bookWithZero,
    // Complex fields (JSON strings)
    facilities, amenities, description,
    // Property Info
    propertyType,
    // Legacy fields
    descriptionAboutHotel, taxesAndFees, freeBreakfast, freeParking, freeCancellation
  } = req.body;

  if (!name || !location) throw new ErrorHandler(400, "Name and location are required!");
  if (!price) throw new ErrorHandler(400, "Price is required!");

  const uploadedImages = {};

  // Upload images to Cloudinary
  const imageFields = ["image1", "image2", "image3", "image4", "image5"];
  for (const field of imageFields) {
    if (req.files && req.files[field]) {
      const result = await uploadOnCloudinary(req.files[field][0].path);
      uploadedImages[field] = result;
    }
  }

  // Parse/normalize complex multipart fields (they may be JSON strings or bracketed objects)
  const parsedFacilities = normalizeMultipartField(facilities) || [];
  const parsedAmenities = normalizeMultipartField(amenities) || [];
  let parsedDescription = normalizeMultipartField(description) || [];

  // ensure description is an array of objects with `place` and `info` (array)
  if (parsedDescription && !Array.isArray(parsedDescription)) {
    // if single object, wrap
    parsedDescription = [parsedDescription];
  }
  if (!parsedDescription) parsedDescription = [];
  parsedDescription = parsedDescription.map(item => {
    if (!item) return { place: "", info: [] };
    const place = (typeof item.place === 'string') ? item.place : (typeof item === 'string' ? item : (item.place || ''));
    const info = normalizeMultipartField(item.info) || [];
    return { place, info };
  });

  const hotel = await Hotels.create({
    // Basic Info
    name,
    city: city || "",
    location,
    starCategory: starCategory || "",
    star: Number(star) || 0,
    budget: budget || "",
    
    // Ratings & Reviews
    rating: Number(rating) || 0,
    reviewLabel: reviewLabel || "",
    reviewCount: Number(reviewCount) || 0,
    
    // Pricing & Offers
    price: Number(price),
    originalPrice: Number(originalPrice) || 0,
    tax: Number(tax) || 0,
    initialAmount: Number(initialAmount) || 0,
    discount: Number(discount) || 0,
    promocode: promocode || "",
    
  // Booking & Availability
  availableFrom: availableFrom ? new Date(availableFrom) : undefined,
  availableTo: availableTo ? new Date(availableTo) : undefined,
  day: Number(day) || 0,
  night: Number(night) || 0,
  rooms: Number(rooms) || 1,
  guests: Number(guests) || 1,
  people: Number(people) || 1,
  perk: perk || "",
  bookWithZero: parseBoolean(bookWithZero),
    
    // Complex fields
  facilities: Array.isArray(parsedFacilities) ? parsedFacilities : [parsedFacilities].filter(Boolean),
  amenities: Array.isArray(parsedAmenities) ? parsedAmenities : [parsedAmenities].filter(Boolean),
  description: parsedDescription,
    
    // Property Info
    propertyType: propertyType || "HOTEL",
    
    // Legacy fields
    descriptionAboutHotel: descriptionAboutHotel || "",
    taxesAndFees: Number(taxesAndFees) || 0,
  freeBreakfast: parseBoolean(freeBreakfast),
  freeParking: parseBoolean(freeParking),
  freeCancellation: parseBoolean(freeCancellation),
    
    // Images
    ...uploadedImages,
  });

  return res
    .status(201)
    .json(new ResponseHandler(201, hotel, "Hotel created successfully!"));
});

/* ======================================================
   ✏️ UPDATE HOTEL (Admin)
====================================================== */
export const updateHotel = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotels.findById(id);
  if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

  const imageFields = ["image1", "image2", "image3", "image4", "image5"];
  const updates = { ...req.body };

  // Handle image uploads
  for (const field of imageFields) {
    if (req.files && req.files[field]) {
      const result = await uploadOnCloudinary(req.files[field][0].path);
      updates[field] = result;
    }
  }

  // Normalize complex multipart fields coming from form-data
  if (updates.facilities !== undefined) {
    const n = normalizeMultipartField(updates.facilities);
    updates.facilities = Array.isArray(n) ? n : (n ? [n] : []);
  }
  if (updates.amenities !== undefined) {
    const n = normalizeMultipartField(updates.amenities);
    updates.amenities = Array.isArray(n) ? n : (n ? [n] : []);
  }
  if (updates.description !== undefined) {
    let n = normalizeMultipartField(updates.description);
    if (n && !Array.isArray(n)) n = [n];
    if (!n) n = [];
    // ensure each item normalized
    updates.description = n.map(item => {
      if (!item) return { place: "", info: [] };
      const place = typeof item.place === 'string' ? item.place : (typeof item === 'string' ? item : (item.place || ''));
      const info = normalizeMultipartField(item.info) || [];
      return { place, info };
    });
  }

  // Extra defensive parsing: sometimes multer/form-data sends description as a raw string like "[]"
  if (typeof updates.description === 'string') {
    const s = updates.description.trim();
    if (s === "" || s === "[]") {
      updates.description = [];
    } else {
      try {
        const parsed = JSON.parse(s);
        updates.description = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        // If parsing fails, remove the description field to avoid casting errors
        updates.description = [];
      }
    }
  }

  // Convert numeric fields
  const numericFields = ['star', 'rating', 'reviewCount', 'price', 'originalPrice', 'tax', 'initialAmount', 'discount', 'day', 'night', 'rooms', 'guests', 'people', 'taxesAndFees'];
  numericFields.forEach(field => {
    if (updates[field] !== undefined) {
      updates[field] = Number(updates[field]) || 0;
    }
  });

  // Convert boolean fields robustly
  const booleanFields = ['bookWithZero', 'freeBreakfast', 'freeParking', 'freeCancellation'];
  booleanFields.forEach(field => {
    if (updates[field] !== undefined) updates[field] = parseBoolean(updates[field]);
  });

  // Convert date fields
  if (updates.availableFrom) {
    updates.availableFrom = new Date(updates.availableFrom);
  }
  if (updates.availableTo) {
    updates.availableTo = new Date(updates.availableTo);
  }

  const updatedHotel = await Hotels.findByIdAndUpdate(id, updates, { new: true });
  return res
    .status(200)
    .json(new ResponseHandler(200, updatedHotel, "Hotel updated successfully!"));
});

/* ======================================================
   ❌ DELETE HOTEL (Admin)
====================================================== */
export const deleteHotel = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotels.findById(id);
  if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

  // Note: Cloudinary cleanup would happen here if needed
  await hotel.deleteOne();

  return res
    .status(200)
    .json(new ResponseHandler(200, null, "Hotel deleted successfully!"));
});

/* ======================================================
   🔁 TOGGLE AMENITY (Admin)
====================================================== */
export const toggleAmenity = AsyncHandler(async (req, res) => {
  const { id, amenity } = req.params;
  const hotel = await Hotels.findById(id);
  if (!hotel) throw new ErrorHandler(404, "Hotel not found!");
  // If model stores amenities as an array of strings (new schema), toggle presence
  if (Array.isArray(hotel.amenities)) {
    const idx = hotel.amenities.indexOf(amenity);
    if (idx >= 0) hotel.amenities.splice(idx, 1);
    else hotel.amenities.push(amenity);
  } else if (hotel[amenity] !== undefined) {
    // fallback for legacy boolean fields
    hotel[amenity] = !hotel[amenity];
  } else {
    throw new ErrorHandler(400, `Amenity "${amenity}" not found in hotel model!`);
  }
  await hotel.save();

  return res
    .status(200)
    .json(new ResponseHandler(200, hotel, `${amenity} toggled successfully!`));
});

/* ======================================================
   🌍 GET ALL HOTELS (Public)
====================================================== */
export const getAllHotels = AsyncHandler(async (req, res) => {
  const hotels = await Hotels.find();

  const transformedHotels = hotels.map(hotel => ({
    ...hotel._doc,
    images: [hotel.image1, hotel.image2, hotel.image3, hotel.image4, hotel.image5].filter(Boolean),
  }));

  return res
    .status(200)
    .json(new ResponseHandler(200, transformedHotels, "All hotels fetched successfully!"));
});

/* ======================================================
   🔍 GET HOTEL BY ID (Public)
====================================================== */
export const getHotelById = AsyncHandler(async (req, res) => {
  const { _id } = req.params;
  const hotel = await Hotels.findById(_id);
  if (!hotel) throw new ErrorHandler(404, "Hotel not found!");

  const transformedHotel = {
    ...hotel._doc,
    images: [hotel.image1, hotel.image2, hotel.image3, hotel.image4, hotel.image5].filter(Boolean),
  };

  return res
    .status(200)
    .json(new ResponseHandler(200, transformedHotel, "Hotel fetched successfully!"));
});

/* ======================================================
   📍 GET HOTELS BY LOCATION (Public)
====================================================== */
export const getHotelsByLocation = AsyncHandler(async (req, res) => {
  const { location } = req.params;

  const hotels = await Hotels.find({
    location: { $regex: new RegExp(location, "i") },
  });

  if (!hotels.length) throw new ErrorHandler(404, "No hotels found in this location!");

  // ✅ Transform each hotel to include an images array
  const transformedHotels = hotels.map(hotel => ({
    ...hotel._doc,
    images: [hotel.image1, hotel.image2, hotel.image3, hotel.image4, hotel.image5].filter(Boolean),
  }));

  return res
    .status(200)
    .json(new ResponseHandler(200, transformedHotels, "Hotels fetched successfully by location!"));
});
