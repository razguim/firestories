import mongoose from "mongoose";
const dbconnect = async() => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
       
        console.log(`MongoDB Connected : ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}
export default dbconnect