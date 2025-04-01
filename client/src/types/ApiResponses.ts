import { Article } from "./Article"

export interface GetArticlesResponse {
  body: {
    articles: Article[]
  }
}

// TODO: delete/replace once single article delete is added
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