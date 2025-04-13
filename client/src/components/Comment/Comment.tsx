import { useRef, useState } from 'react'
import CONSTANTS from '../../constants.ts'
import { addCommentLike } from '../../services/CommentService.ts'
import { addReply } from '../../services/ReplyService.ts'
import { Comment as CommentType } from '../../types/Comment'
import { Reply as ReplyType } from '../../types/Reply'
import Reply from '../Reply/Reply.tsx'

type Props = {
  data: CommentType
}

function Comment({ data }: Props) {
  const [comment, setComment] = useState(data)
  const [likes, setLikes] = useState(comment.likes)
  const replyInputElement = useRef<HTMLTextAreaElement>(null)
  const [replyLength, setReplyLength] = useState<number>(0)

  /**
   * Add a like to a comment.
   */
  const submitCommentLike = async (): Promise<void> => {
    // TODO: account check
    await addCommentLike(comment._id)
    setLikes(likes + 1)
  }

  /**
   * Submit a reply to the comment.
   */
  async function submitReply(): Promise<void> {
    if (replyLength == 0 || replyLength > CONSTANTS.REPLY_MAX_LENGTH) {
      alert(`Reply between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`)
      return
    }

    const reply: ReplyType | null = await addReply(
      comment!._id,
      replyInputElement.current!.value
    )
    console.log(reply)
    if (reply !== null) {
      setComment({
        ...comment,
        replies: [reply, ...comment.replies],
      })
      replyInputElement.current!.value = ''
      setReplyLength(0)
    }
  }

  return (
    <>
      <div style={{ border: 'solid red 1px', padding: '1rem' }}>
        <p>{comment.text}</p>
        <button onClick={submitCommentLike}>👍 {likes}</button>
        <br />
        <div>
          <label>reply</label>
          <textarea
            ref={replyInputElement}
            onChange={(event) => setReplyLength(event.target.value.length)}
          ></textarea>
          <p>
            {replyLength}/{CONSTANTS.REPLY_MAX_LENGTH}
          </p>
          <br />
          <button onClick={submitReply}>submit</button>
        </div>
        <br />
        {comment!.replies.map((reply: ReplyType) => (
          <Reply key={reply._id} data={reply} />
        ))}
      </div>
    </>
  )
}

export default Comment
