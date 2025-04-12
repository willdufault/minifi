import axios, { AxiosResponse } from 'axios'
import { Reply } from '../types/Reply.ts'
import * as ApiResponses from '../types/ReplyApiResponses.ts'

/**
 * Add a reply to the comment.
 * @param commentId The comment ID.
 * @param text The content of the reply.
 * @returns
 */
export async function addReply(
  commentId: string,
  text: string
): Promise<Reply | null> {
  try {
    const response: AxiosResponse<ApiResponses.AddReplyResponse> =
      await axios.post('/api/addReply', { commentId, text })
    const data: ApiResponses.AddReplyResponse = response.data
    return data.body.reply
  } catch (error) {
    console.log(error)
    return null
  }
}

// TODO: tie likes to user, persistent + block >1 likes
/**
 * Increment the like count for a reply.
 * @param replyId The reply ID.
 */
export async function addReplyLike(replyId: string): Promise<void> {
  try {
    await axios.post('/api/addReplyLike', {
      replyId,
    })
  } catch (error) {
    console.log(error)
  }
}
