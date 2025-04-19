import { Article } from './Article'

export type GetArticlesResponse = {
  body: {
    articles: Article[]
  }
}

export type GetArticleResponse = {
  body: {
    article: Article
  }
}

export type CreateArticleResponse = {
  body: {
    article: Article
  }
}
