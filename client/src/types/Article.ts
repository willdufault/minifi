import { Comment } from './Comment'
import { Reactions } from './Reactions'

export type Article = {
  _id: string
  title: string
  body: string
  reactions: Reactions
  comments: Comment[]
}
