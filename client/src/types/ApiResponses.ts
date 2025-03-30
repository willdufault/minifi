import { Article } from "./Article"

export interface GetArticlesResponse {
  body: {
    articles: Article[]
  }
}

export interface DeleteArticlesResponse {
  body: {
    message: string
  }
}

export interface CreateArticleResponse {
  body: {
    article: Article
  }
}