import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],
    credentials: true
}))

app.use(cookieParser())

app.use(express.static("public"))

app.use(express.json({
    limit: "1mb",
}))

app.use(express.urlencoded({
    limit: "500kb",
    extended: true
}))



import userRouter from "./routes/user.routes.js"
import hotelRouter from "./routes/hotel.route.js"
import packageRouter from "./routes/package.route.js"
import contactRouter from "./routes/contact.route.js"
import tripEnquiryRouter from "./routes/tripEnquiry.route.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/hotel", hotelRouter)
app.use("/api/v1/package", packageRouter)
app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/trip", tripEnquiryRouter);

export default app