import { Comment } from './Comment'

export type AddCommentResponse = {
  body: {
    comment: Comment
  }
}

export type UpdateCommentResponse = {
  body: {
    comment: Comment
  }
}
