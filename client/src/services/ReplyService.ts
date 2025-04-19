import axios, { AxiosResponse } from 'axios'
import { Reply as ReplyType } from '../types/Reply.ts'
import * as ApiResponses from '../types/ReplyApiResponses.ts'

/**
 * Add a reply to a comment.
 * @param commentId The comment ID.
 * @param text The reply text.
 * @returns The reply.
 */
export async function addReply(
  commentId: string,
  text: string
): Promise<ReplyType | null> {
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
 * Add a like to a reply.
 * @param replyId The reply ID.
 */
export async function addReplyLike(replyId: string): Promise<boolean> {
  try {
    await axios.post('/api/addReplyLike', { replyId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
