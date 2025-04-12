import axios, { AxiosResponse } from 'axios'
import { Article } from '../types/Article.ts'
import * as ApiResponses from '../types/ArticleApiResponses.ts'

/**
 * Fetches list of articles from database.
 * @returns The list of articles.
 */
export async function getArticles(): Promise<Article[] | null> {
  try {
    const response: AxiosResponse<ApiResponses.GetArticlesResponse> =
      await axios.get('/api/getArticles')
    const data: ApiResponses.GetArticlesResponse = response.data
    return data.body.articles
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Fetch the article from the database with the given ID.
 * @param articleId The article ID.
 * @returns The article.
 */
export async function getArticle(articleId: string): Promise<Article | null> {
  try {
    const response = await axios.get('/api/getArticle', {
      params: { articleId },
    })
    const data = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Deletes the article with the given ID from the database.
 * @param articleId The article ID.
 * @returns True if the delete was successful.
 */
export async function deleteArticle(articleId: string): Promise<boolean> {
  try {
    await axios.post('/api/deleteArticle', { articleId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * Create an article in the database.
 * @param title The title of the article.
 * @param body The body of the article.
 * @returns The article.
 */
export async function createArticle(
  title: string,
  body: string
): Promise<Article | null> {
  try {
    const response: AxiosResponse<ApiResponses.CreateArticleResponse> =
      await axios.post('/api/createArticle', { title, body })
    const data: ApiResponses.CreateArticleResponse = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Create an article in the database.
 * @param articleId The article ID.
 * @param title The title of the article.
 * @param body The body of the article.
 * @returns The article.
 */
export async function updateArticle(
  articleId: string,
  title: string,
  body: string
): Promise<Article | null> {
  try {
    const response: AxiosResponse<ApiResponses.CreateArticleResponse> =
      await axios.post('/api/updateArticle', { articleId, title, body })
    const data: ApiResponses.CreateArticleResponse = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

// TODO: tie reactions to user, persistent + block >1 reactions
/**
 * Increment the count for the given reaction and article.
 * @param articleId
 * @param reaction
 */
export async function addReaction(
  articleId: string,
  reaction: string
): Promise<void> {
  try {
    await axios.post('/api/addReaction', {
      articleId,
      reaction,
    })
  } catch (error) {
    console.log(error)
  }
}
