export interface Article {
  _id: string,
  title: string,
  body: string
  reactions: { [key: number]: number }
}