import mongoose from "mongoose";

const tripEnquirySchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true },
    date: { type: String, required: true },
    departureCity: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },

    adult: { type: Number, default: 1 },
    child: { type: Number, default: 0 },
    infant: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TripEnquiry = mongoose.model("TripEnquiry", tripEnquirySchema);
export default TripEnquiry;
