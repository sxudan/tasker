import authController from '../controller/auth.js'
import { Router } from "express"
const router = Router()

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const uid = req.body.uid
        const data = await authController.login(uid)
        if(data == null) throw Error("Bad Auth");
        res.status(200).json(data)
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

export default router;