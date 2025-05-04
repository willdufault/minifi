const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.post('/addComment', CommentController.addComment)
router.post('/updateComment', CommentController.updateComment)
router.post('/addCommentLike', CommentController.addCommentLike)
router.post('/deleteComment', CommentController.deleteComment)

module.exports = router
