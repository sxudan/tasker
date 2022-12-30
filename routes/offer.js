import { Router } from "express"
import offerController from '../controller/offer.js'
const router = Router()

router.get('/:taskId', async (req, res, next) => {
    try {
        const json = await offerController.getOffers(req.query.uid, req.params.taskId)
        res.status(200).json(json)
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        const json = await offerController.makeOffer(req.query.uid, req.body)
        res.status(200).json({})
    } catch(error) {
        res.status(400).json({
            error_message: error.message
        })
    }
})

export default router;