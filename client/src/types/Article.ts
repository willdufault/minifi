import CONSTANTS from '../constants'
import { Comment } from './Comment'
import { Reactions } from './Reactions'

export type Article = {
  _id: string
  title: string
  body: string
  topic: string & (typeof CONSTANTS)['TOPICS'][number]
  date: string
  featured: boolean
  reactions: Reactions
  comments: Comment[]
}
