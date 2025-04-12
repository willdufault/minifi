import { Article } from "./Article"

export type GetArticlesResponse = {
  body: {
    articles: Article[]
  }
}

export type CreateArticleResponse = {
  body: {
    article: Article
  }
}