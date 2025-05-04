const express = require('express')
const router = express.Router()
const ReplyController = require('../controllers/ReplyController')

router.post('/addReply', ReplyController.addReply)
router.post('/updateReply', ReplyController.updateReply)
router.post('/addReplyLike', ReplyController.addReplyLike)
router.post('/deleteReply', ReplyController.deleteReply)

module.exports = router
