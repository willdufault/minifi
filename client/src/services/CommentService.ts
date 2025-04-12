import axios, { AxiosResponse } from 'axios'
import { Comment } from '../types/Comment.ts'
import * as ApiResponses from '../types/CommentApiResponses.ts'

/**
 * Add a comment to the given article.
 * @param articleId The article ID.
 * @param text The content of the comment.
 * @returns
 */
export async function addComment(
  articleId: string,
  text: string
): Promise<Comment | null> {
  try {
    const response: AxiosResponse<ApiResponses.AddCommentResponse> =
      await axios.post('/api/addComment', { articleId, text })
    const data: ApiResponses.AddCommentResponse = response.data
    return data.body.comment
  } catch (error) {
    console.log(error)
    return null
  }
}

// TODO: tie likes to user, persistent + block >1 likes
/**
 * Increment the like count for a comment.
 * @param articleId
 * @param reaction
 */
export async function addCommentLike(commentId: string): Promise<void> {
  try {
    await axios.post('/api/addCommentLike', {
      commentId,
    })
  } catch (error) {
    console.log(error)
  }
}
