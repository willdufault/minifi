import { ChangeEvent, useState } from 'react'
import CONSTANTS from '../../constants.ts'
import {
  addReplyLike,
  deleteReply,
  updateReply,
} from '../../services/ReplyService.ts'
import { Reply as ReplyType } from '../../types/Reply'
import EmojiButton from '../EmojiButton/EmojiButton.tsx'

type Props = {
  data: ReplyType
}

function Reply({ data }: Props) {
  const [reply, setReply] = useState<ReplyType>(data)
  const [editText, setEditText] = useState<string>(reply.text)
  const [hidden, setHidden] = useState<boolean>(false)

  /**
   * Add a like to the reply.
   */
  async function addReplyLikeHandler(): Promise<void> {
    const added: boolean = await addReplyLike(reply._id)
    if (added) {
      setReply({
        ...reply,
        likes: reply.likes + 1,
      })
    }
  }

  /**
   * Update the reply.
   */
  async function updateReplyHandler(): Promise<void> {
    if (editText.length === 0) {
      return
    }

    if (editText.length > CONSTANTS.REPLY_MAX_LENGTH) {
      alert(
        `Reply must be between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`
      )
      return
    }

    const responseReply: ReplyType | null = await updateReply(
      reply._id,
      editText
    )
    if (responseReply !== null) {
      setReply({
        ...reply,
        text: responseReply.text,
      })
    }
  }

  /**
   * Delete the reply.
   */
  async function deleteReplyHandler(): Promise<void> {
    const deleted: boolean = await deleteReply(reply._id)
    setHidden(deleted)
  }

  if (hidden) {
    return null
  }

  return (
    <>
      <div className="my-4">
        <p className="mb-4">{reply.text}</p>
        <EmojiButton
          emoji="👍"
          count={reply.likes}
          callback={addReplyLikeHandler}
        />
        <button className="hidden" onClick={deleteReplyHandler}>
          delete
        </button>
        <div
          className="hidden"
          style={{ border: 'solid purple 1px', padding: '1rem' }}
        >
          <label>edit reply: </label>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEditText(event.target.value)
            }
            value={editText}
          ></input>
          <p>
            {editText.length}/{CONSTANTS.REPLY_MAX_LENGTH}
          </p>
          <button onClick={updateReplyHandler}>submit</button>
          <button onClick={() => setEditText(reply.text)}>cancel</button>
        </div>
      </div>
    </>
  )
}

export default Reply
