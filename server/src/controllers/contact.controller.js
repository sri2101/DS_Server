import Contact from "../models/contact.model.js"

export const submitInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, travelPlans } = req.body;

    if (!fullName || !email || !phone || !travelPlans) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await Contact.create({
      fullName,
      email,
      phone,
      travelPlans,
    });

    res.status(200).json({
      success: true,
      message: "Your inquiry has been submitted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
