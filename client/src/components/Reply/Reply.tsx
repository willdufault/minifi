import { useState } from 'react'
import { addReplyLike } from '../../services/ReplyService.ts'
import { Reply as ReplyType } from '../../types/Reply'

type Props = {
  data: ReplyType
}

function Reply({ data }: Props) {
  const reply: ReplyType = data

  const [likes, setLikes] = useState(reply.likes)

  /**
   * Add a like to a reply.
   */
  const submitReplyLike = async (): Promise<void> => {
    // TODO: account check
    const added: boolean = await addReplyLike(reply._id)
    if (added) {
      setLikes(likes + 1)
    }
  }

  return (
    <>
      <div style={{ border: 'solid blue 1px', padding: '1rem' }}>
        <p>{reply.text}</p>
        <button onClick={submitReplyLike}>👍 {likes}</button>
      </div>
    </>
  )
}

export default Reply
