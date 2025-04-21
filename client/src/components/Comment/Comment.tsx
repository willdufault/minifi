import { useState } from 'react'
import CONSTANTS from '../../constants.ts'
import { addCommentLike, updateComment } from '../../services/CommentService.ts'
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

  /**
   * Add a like to a comment.
   */
  const submitCommentLike = async (): Promise<void> => {
    // TODO: account check
    const added: boolean = await addCommentLike(comment._id)
    if (added) {
      setComment({
        ...comment,
        likes: comment.likes + 1,
      })
    }
  }

  /**
   * Edit the comment.
   */
  async function editComment(): Promise<void> {
    if (editText.length == 0 || editText.length > CONSTANTS.REPLY_MAX_LENGTH) {
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
   * Submit a reply to the comment.
   */
  async function submitReply(): Promise<void> {
    if (
      replyText.length == 0 ||
      replyText.length > CONSTANTS.REPLY_MAX_LENGTH
    ) {
      alert(
        `Reply must be between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`
      )
      return
    }

    const reply: ReplyType | null = await addReply(comment!._id, replyText)
    if (reply !== null) {
      setComment({
        ...comment,
        replies: [reply, ...comment.replies],
      })
      setReplyText('')
    }
  }

  return (
    <>
      <div style={{ border: 'solid red 1px', padding: '1rem' }}>
        <p>{comment.text}</p>
        <button onClick={submitCommentLike}>👍 {comment.likes}</button>
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
          <button onClick={editComment}>submit</button>
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
          <button onClick={submitReply}>submit</button>
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
