import { useState } from 'react'
import CONSTANTS from '../../constants.ts'
import { addReplyLike, updateReply } from '../../services/ReplyService.ts'
import { Reply as ReplyType } from '../../types/Reply'

type Props = {
  data: ReplyType
}

function Reply({ data }: Props) {
  const [reply, setReply] = useState<ReplyType>(data)
  const [editText, setEditText] = useState<string>(reply.text)

  /**
   * Add a like to a reply.
   */
  const submitReplyLike = async (): Promise<void> => {
    // TODO: account check
    const added: boolean = await addReplyLike(reply._id)
    if (added) {
      setReply({
        ...reply,
        likes: reply.likes + 1,
      })
    }
  }

  /**
   * Edit the reply.
   */
  async function editReply(): Promise<void> {
    if (editText.length == 0 || editText.length > CONSTANTS.REPLY_MAX_LENGTH) {
      alert(
        `Reply must be between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`
      )
      return
    }

    const responseReply: ReplyType | null = await updateReply(
      reply!._id,
      editText
    )
    if (responseReply !== null) {
      setReply({
        ...reply,
        text: responseReply.text,
      })
    }
  }

  return (
    <>
      <div style={{ border: 'solid blue 1px', padding: '1rem' }}>
        <p>{reply.text}</p>
        <button onClick={submitReplyLike}>👍 {reply.likes}</button>
        <br />
        <br />
        <div style={{ border: 'solid purple 1px', padding: '1rem' }}>
          <label>edit reply: </label>
          <textarea
            onChange={(event) => setEditText(event.target.value)}
            value={editText}
          ></textarea>
          <p>
            {editText.length}/{CONSTANTS.REPLY_MAX_LENGTH}
          </p>
          <button onClick={editReply}>submit</button>
          <button onClick={() => setEditText(reply.text)}>cancel</button>
        </div>
      </div>
    </>
  )
}

export default Reply
