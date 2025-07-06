import axios, { AxiosResponse } from 'axios'
import { Article as ArticleType } from '../types/Article.ts'
import * as ApiResponses from '../types/ArticleApiResponses.ts'

/**
 * Get an article.
 * @param articleId The article ID.
 * @returns The article.
 */
export async function getArticle(
  articleId: string
): Promise<ArticleType | null> {
  try {
    const response: AxiosResponse<ApiResponses.GetArticleResponse> =
      await axios.get('/api/getArticle', { params: { articleId } })
    const data: ApiResponses.GetArticleResponse = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Search all articles.
 * @param query The query.
 * @returns The list of articles.
 */
export async function searchArticles(
  query: string
): Promise<ArticleType[] | null> {
  try {
    const response: AxiosResponse<ApiResponses.SearchArticlesResponse> =
      await axios.get('/api/searchArticles', { params: { query } })
    const data: ApiResponses.SearchArticlesResponse = response.data
    return data.body.articles
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Delete an article.
 * @param articleId The article ID.
 * @returns Whether the article was deleted.
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
 * Create an article.
 * @param title The article title.
 * @param body The article body.
 * @param topic The article topic.
 * @returns The article.
 */
export async function createArticle(
  title: string,
  body: string,
  topic: string
): Promise<ArticleType | null> {
  try {
    const response: AxiosResponse<ApiResponses.CreateArticleResponse> =
      await axios.post('/api/createArticle', { title, body, topic })
    const data: ApiResponses.CreateArticleResponse = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Update an article.
 * @param articleId The article ID.
 * @param title The article title.
 * @param body The article body.
 * @param topic The article topic.
 * @returns The article.
 */
export async function updateArticle(
  articleId: string,
  title: string,
  body: string,
  topic: string
): Promise<ArticleType | null> {
  try {
    const response: AxiosResponse<ApiResponses.CreateArticleResponse> =
      await axios.post('/api/updateArticle', { articleId, title, body, topic })
    const data: ApiResponses.CreateArticleResponse = response.data
    return data.body.article
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Add a reaction to an article.
 * @param articleId The article ID.
 * @param reaction The reaction emoji.
 * @returns Whether the reaction was added.
 */
export async function addReaction(
  articleId: string,
  reaction: string
): Promise<boolean> {
  try {
    await axios.post('/api/addReaction', { articleId, reaction })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
