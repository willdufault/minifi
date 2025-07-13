const express = require('express')
const router = express.Router()
const ReplyController = require('../controllers/ReplyController')

router.post('/', ReplyController.addReply)
router.put('/:id', ReplyController.updateReply)
router.patch('/:id/likes', ReplyController.addReplyLike)
router.delete('/:id', ReplyController.deleteReply)

module.exports = router
