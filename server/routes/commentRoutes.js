const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.post('/', CommentController.addComment)
router.put('/:id', CommentController.updateComment)
router.patch('/:id/likes', CommentController.addCommentLike)
router.delete('/:id', CommentController.deleteComment)

module.exports = router
