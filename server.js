import express from "express"
import dotEnv from "dotenv"
import cors from "cors"
import colors from "colors"
import ConnectDB from "./config/db.js"
import morgan from "morgan"
import authRoute from "./Routes/authRoute.js"


dotEnv.config()
ConnectDB()
const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api/v1/task', authRoute)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server connected to port 8080 ..     `.bgCyan.white)
})
