import express from "express"
import { addtaskController, deleteTaskController, getAllTaskController, getSingleTaskController, statusController, updateTaskController } from "../controller/taskController.js"

const router = express.Router()

router.post('/addtask', addtaskController)
router.put('/updatetask/:id', updateTaskController)
router.delete('/deletetask/:id', deleteTaskController)
router.get('/getsingletask/:id', getSingleTaskController)
router.get('/getalltasks', getAllTaskController)
router.put('/status/:id', statusController)

export default router
