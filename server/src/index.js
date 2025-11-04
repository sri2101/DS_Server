import dotenv from "dotenv"
import connectDB from "./database/db.connect.js"
import app from "./app.js"

dotenv.config({ path: "./.env" })

connectDB()
.then(function(){
    console.log("DB connected successfully!")

    app.on("ERROR", function(error){
        console.log(error)
    })

    app.listen(process.env.PORT || 4000, function(){
        console.log(`Server is running on port ${process.env.PORT || 4000}`)
        console.log(`Server URL : http://localhost:${process.env.PORT || 4000}`)
    })
})
.catch(function(error){
    console.error(error?.message)
})