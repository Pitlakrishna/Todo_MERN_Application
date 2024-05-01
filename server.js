import express from "express"
import dotEnv from "dotenv"
import cors from "cors"
import colors from "colors"
import ConnectDB from "./config/db.js"
import morgan from "morgan"
import authRoute from "./Routes/authRoute.js"
import path from 'path'
import { fileURLToPath } from "url";


dotEnv.config()
ConnectDB()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "./client/build")))

app.use('/api/v1/task', authRoute)

app.use('*', function (req, res) {
     res.sendFile(path.join(__dirname, './client/build/index.html'))
 })

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server connected to port 8080 ..     `.bgCyan.white)
})
