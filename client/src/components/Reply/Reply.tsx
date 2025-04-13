import { useState } from 'react'
import { addReplyLike } from '../../services/ReplyService.ts'
import { Reply as ReplyType } from '../../types/Reply'

type Props = {
  data: ReplyType
}

function Reply({ data }: Props) {
  const [likes, setLikes] = useState(data.likes)

  /**
   * Add a like to a reply.
   */
  const submitReplyLike = async (): Promise<void> => {
    // TODO: account check
    await addReplyLike(data._id)
    setLikes(likes + 1)
  }

  return (
    <>
      <div style={{ border: 'solid blue 1px', padding: '1rem' }}>
        <p>{data.text}</p>
        <button onClick={submitReplyLike}>👍 {likes}</button>
      </div>
    </>
  )
}

export default Reply
