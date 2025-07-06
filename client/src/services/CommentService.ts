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

/**
 * Add a like to a comment.
 * @param commentId The comment ID.
 * @returns Whether the comment was liked.
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

/**
 * Update a comment.
 * @param commentId The comment ID.
 * @param text The comment text.
 * @returns The comment.
 */
export async function updateComment(
  commentId: string,
  text: string
): Promise<CommentType | null> {
  try {
    const response: AxiosResponse<ApiResponses.UpdateCommentResponse> =
      await axios.post('/api/updateComment', { commentId, text })
    const data: ApiResponses.UpdateCommentResponse = response.data
    return data.body.comment
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Delete a comment.
 * @param commentId The comment ID.
 * @returns Whether the comment was deleted.
 */
export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    await axios.post('/api/deleteComment', { commentId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
