import { Reply } from './Reply'

export type Comment = {
  _id: string
  text: string
  likes: number
  replies: Reply[]
}
