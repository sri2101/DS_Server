import mongoose, { Schema } from "mongoose";

const itineraryDaySchema = new Schema({
  day: { type: Number },
  title: { type: String, default: "" },
  points: { type: [String], default: [] },
});

const emiPlanSchema = new Schema({
  months: { type: Number },
  amount: { type: Number },
});

const emiOptionsSchema = new Schema({
  noCostPlans: { type: [emiPlanSchema], default: [] },
  standardPlans: { type: [emiPlanSchema], default: [] },
});

const priceDetailsSchema = new Schema({
  originalPrice: { type: Number, default: 0 },
  discountedPrice: { type: Number, default: 0 },
  emiOptions: { type: emiOptionsSchema, default: {} },
});

const durationIncludeSchema = new Schema({
  duration: { type: String, default: "" },
  location: { type: String, default: "" },
  includes: { type: [{ label: String, icon: String }], default: [] },
});

const additionalInfoSchema = new Schema({
  travelValidity: { type: String, default: "" },
  highlights: { type: [String], default: [] },
});

const contactSchema = new Schema({
  phones: { type: [String], default: [] },
  email: { type: String, default: "" },
});

const packageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    packageType: { type: String, default: "" },
    themes: { type: [String], default: [] },
    flight: { type: String, default: "" },
    numNights: { type: Number, default: 0 },
    numDays: { type: Number, default: 0 },
    tag: { type: String, default: "" },
    location: { type: String, default: "" },
    images: { type: [String], default: [] },
    tripHighlights: { type: [String], default: [] },
    itinerary: { type: [itineraryDaySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    additionalInfo: { type: additionalInfoSchema, default: {} },
    priceDetails: { type: priceDetailsSchema, default: {} },
    durationAndInclusions: { type: durationIncludeSchema, default: {} },
    contact: { type: contactSchema, default: {} },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
