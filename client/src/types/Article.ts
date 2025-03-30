import { Reaction } from "./Reaction"

export interface Article {
  _id: string,
  title: string,
  body: string
  reactions: Record<Reaction, number>
}