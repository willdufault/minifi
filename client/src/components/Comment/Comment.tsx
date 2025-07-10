import { useState } from 'react'
import CONSTANTS from '../../constants.ts'
import {
    addCommentLike,
    deleteComment,
    updateComment,
} from '../../services/CommentService.ts'
import { addReply } from '../../services/ReplyService.ts'
import { Comment as CommentType } from '../../types/Comment'
import { Reply as ReplyType } from '../../types/Reply'
import Reply from '../Reply/Reply.tsx'

type Props = {
  data: CommentType
}

function Comment({ data }: Props) {
  const [comment, setComment] = useState<CommentType>(data)
  const [editText, setEditText] = useState<string>(comment.text)
  const [replyText, setReplyText] = useState<string>('')
  const [hidden, setHidden] = useState<boolean>(false)

  /**
   * Add a like to the comment.
   */
  async function addCommentLikeHandler(): Promise<void> {
    const added: boolean = await addCommentLike(comment._id)
    if (added) {
      setComment({
        ...comment,
        likes: comment.likes + 1,
      })
    }
  }

  /**
   * Update the comment.
   */
  async function updateCommentHandler(): Promise<void> {
    if (editText.length === 0) {
      return
    }

    if (editText.length > CONSTANTS.REPLY_MAX_LENGTH) {
      alert(
        `Comment must be between 1 and ${CONSTANTS.COMMENT_MAX_LENGTH} characters.`
      )
      return
    }

    const responseComment: CommentType | null = await updateComment(
      comment!._id,
      editText
    )
    if (responseComment !== null) {
      setComment({
        ...comment,
        text: responseComment.text,
      })
    }
  }

  /**
   * Add a reply to the comment.
   */
  async function addReplyHandler(): Promise<void> {
    if (replyText.length === 0) {
      return
    }

    if (replyText.length > CONSTANTS.REPLY_MAX_LENGTH) {
      alert(
        `Reply must be between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`
      )
      return
    }

    const responseReply: ReplyType | null = await addReply(
      comment!._id,
      replyText
    )
    if (responseReply !== null) {
      setComment({
        ...comment,
        replies: [responseReply, ...comment.replies],
      })
      setReplyText('')
    }
  }

  /**
   * Delete the comment.
   */
  async function deleteCommentHandler(): Promise<void> {
    const deleted: boolean = await deleteComment(comment!._id)
    setHidden(deleted)
  }

  if (hidden) {
    return null
  }

  return (
    <>
      <div style={{ border: 'solid red 1px', padding: '1rem' }}>
        <p>{comment.text}</p>
        <button onClick={addCommentLikeHandler}>👍 {comment.likes}</button>
        <button onClick={deleteCommentHandler}>delete</button>
        <br />
        <br />
        <div style={{ border: 'solid lime 1px', padding: '1rem' }}>
          <label>edit comment: </label>
          <textarea
            onChange={(event) => setEditText(event.target.value)}
            value={editText}
          ></textarea>
          <p>
            {editText.length}/{CONSTANTS.COMMENT_MAX_LENGTH}
          </p>
          <button onClick={updateCommentHandler}>submit</button>
          <button onClick={() => setEditText(comment.text)}>cancel</button>
        </div>
        <br />
        <br />
        <div style={{ border: 'solid orange 1px', padding: '1rem' }}>
          <label>reply: </label>
          <textarea
            onChange={(event) => setReplyText(event.target.value)}
            value={replyText}
          ></textarea>
          <p>
            {replyText.length}/{CONSTANTS.REPLY_MAX_LENGTH}
          </p>
          <button onClick={addReplyHandler}>submit</button>
        </div>
        <br />
        {comment.replies.map((reply: ReplyType) => (
          <Reply key={reply._id} data={reply} />
        ))}
      </div>
    </>
  )
}

export default Comment
