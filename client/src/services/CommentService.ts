import axios, { AxiosResponse } from 'axios'
import { Comment } from '../types/Comment.ts'
import * as ApiResponses from '../types/CommentApiResponses.ts'

export async function addComment(
  articleId: string,
  body: string
): Promise<Comment | null> {
  try {
    const response: AxiosResponse<ApiResponses.AddCommentResponse> =
      await axios.post('/api/addComment', { articleId, body })
    const data: ApiResponses.AddCommentResponse = response.data
    return data.body.comment
  } catch (error) {
    console.log(error)
    return null
  }
}
