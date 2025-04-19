import axios, { AxiosResponse } from 'axios'
import { Comment as CommentType } from '../types/Comment.ts'
import * as ApiResponses from '../types/CommentApiResponses.ts'

/**
 * Add a comment to an article.
 * @param articleId The article ID.
 * @param text The comment text.
 * @returns Whether the comment was added.
 */
export async function addComment(
  articleId: string,
  text: string
): Promise<CommentType | null> {
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
 * Add a like to a comment.
 * @param commentId The comment ID.
 * @returns //TODO
 */
export async function addCommentLike(commentId: string): Promise<boolean> {
  try {
    await axios.post('/api/addCommentLike', { commentId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
