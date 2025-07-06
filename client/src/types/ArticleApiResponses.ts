import { Article } from './Article'

export type GetArticleResponse = {
  body: {
    article: Article
  }
}

export type SearchArticlesResponse = {
  body: {
    articles: Article[]
  }
}

export type CreateArticleResponse = {
  body: {
    article: Article
  }
}
