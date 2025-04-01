import { Article } from "./Article"

export interface GetArticlesResponse {
  body: {
    articles: Article[]
  }
}

export interface CreateArticleResponse {
  body: {
    article: Article
  }
}