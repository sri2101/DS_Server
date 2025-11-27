import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelPlans: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact= mongoose.model("Contact", ContactSchema);

export default Contact
