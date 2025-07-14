import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, KeyboardEvent, ReactNode, useState } from 'react'
import CONSTANTS from '../../constants.ts'
import {
  addCommentLike,
  deleteComment,
  updateComment,
} from '../../services/CommentService.ts'
import { addReply } from '../../services/ReplyService.ts'
import { Comment as CommentType } from '../../types/Comment'
import { Reply as ReplyType } from '../../types/Reply'
import Divider from '../Divider/Divider.tsx'
import EmojiButton from '../EmojiButton/EmojiButton.tsx'
import IconButton from '../IconButton/IconButton.tsx'
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
      comment._id,
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
      comment._id,
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
    const deleted: boolean = await deleteComment(comment._id)
    setHidden(deleted)
  }

  /**
   * Render the length count.
   * @param current The current length.
   * @param limit The max length.
   * @returns The length count.
   */
  function renderLengthCount(current: number, limit: number): ReactNode {
    const colorClass: string =
      current > limit ? 'text-red-500' : 'text-gray-400'
    return (
      <p className={`text-xs text-right ${colorClass}`}>
        {current}/{limit}
      </p>
    )
  }

  /**
   * Render the reply button.
   * @returns The  reply button.
   */
  function renderReplyButton(): ReactNode {
    const disabled: boolean =
      replyText.length === 0 || replyText.length > CONSTANTS.REPLY_MAX_LENGTH
    return (
      <IconButton
        icon={faCheck}
        text="Reply"
        color="green"
        disabled={disabled}
        callback={addReplyHandler}
      />
    )
  }

  /**
   * Add a reply if the enter key is pressed.
   * @param event The keyboard event.
   */
  function replyKeyDownHandler(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      addReplyHandler()
    }
  }

  if (hidden) {
    return null
  }

  return (
    <>
      <div className="my-4">
        <p className="mb-4">{comment.text}</p>
        <EmojiButton
          emoji="👍"
          count={comment.likes}
          callback={addCommentLikeHandler}
        />
        <button className="hidden" onClick={deleteCommentHandler}>
          delete
        </button>
        <div
          className="hidden"
          style={{ border: 'solid lime 1px', padding: '1rem' }}
        >
          <label>edit comment: </label>
          <textarea
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setEditText(event.target.value)
            }
            value={editText}
          ></textarea>
          <p>
            {editText.length}/{CONSTANTS.COMMENT_MAX_LENGTH}
          </p>
          <button onClick={updateCommentHandler}>submit</button>
          <button onClick={() => setEditText(comment.text)}>cancel</button>
        </div>
        <Divider />
        <div className="my-4 ml-12">
          <input
            className="w-full outline-none border-b border-gray-400 focus:border-gray-600"
            placeholder="Add a reply..."
            value={replyText}
            onKeyDown={replyKeyDownHandler}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setReplyText(event.target.value)
            }
          ></input>
          {renderLengthCount(replyText.length, CONSTANTS.COMMENT_MAX_LENGTH)}
          <div className="flex justify-end mt-2">{renderReplyButton()}</div>
          {comment.replies.map((reply: ReplyType) => (
            <>
              <Divider />
              <Reply key={reply._id} data={reply} />
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Comment
