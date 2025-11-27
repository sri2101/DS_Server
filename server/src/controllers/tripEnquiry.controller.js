import TripEnquiry from "../models/tripEnquiry.model.js";

export const submitTripEnquiry = async (req, res) => {
  try {
    const {
      packageName,
      date,
      departureCity,
      name,
      mobile,
      email,
      adult,
      child,
      infant,
    } = req.body;

    if (!packageName || !date || !departureCity || !name || !mobile || !email) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const enquiry = await TripEnquiry.create({
      packageName,
      date,
      departureCity,
      name,
      mobile,
      email,
      adult,
      child,
      infant,
    });

    return res.json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry,
    });
  } catch (err) {
    console.error("Trip Enquiry Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting enquiry.",
    });
  }
};
