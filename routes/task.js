import { Router } from "express"
import taskController from '../controller/task.js'
const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const json = await taskController.getTasks(req.query.uid)
        res.status(200).json(json)
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

router.get('/mytask', async (req, res, next) => {
    try {
        const json = await taskController.getMyTask(req.query.uid)
        res.status(200).json(json)
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        await taskController.postTask(req.body, req.query.uid)
        res.status(200).json({})
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

export default router;