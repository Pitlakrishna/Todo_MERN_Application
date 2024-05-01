import mongoose from "mongoose";
import colors from 'colors'

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DataBase Conntected to MongoDB .... `.bgMagenta.white)
    } catch (error) {
        console.log(`Error in Database ....`.bgRed.white)
    }
}

export default ConnectDB

