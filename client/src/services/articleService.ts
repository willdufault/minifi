import axios, { AxiosResponse } from 'axios'
import * as ApiResponses from '../types/ApiResponses.ts';
import { Article } from '../types/Article.ts';
import { Reaction } from '../types/Reaction.ts';

/**
 * Fetches list of articles from database.
 * @returns The list of articles.
 */
export async function getArticles(): Promise<Article[] | null> {
  try {
    const res: AxiosResponse<ApiResponses.GetArticlesResponse> = await axios.get('/api/getArticles')
    const data: ApiResponses.GetArticlesResponse = res.data
    return data.body.articles
  }
  catch (err) {
    console.log(err)
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
    const res = await axios.get('/api/getArticle', { params: { articleId } })
    const data = res.data
    return data.body.article
  }
  catch (err) {
    console.log(err)
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
  }
  catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Create an article in the database.
 * @param title The title of the article.
 * @param body The body of the article.
 * @returns The article.
 */
export async function createArticle(title: string, body: string): Promise<Article | null> {
  try {
    const res: AxiosResponse<ApiResponses.CreateArticleResponse> = await axios.post(
      '/api/createArticle',
      { title, body }
    )
    const data: ApiResponses.CreateArticleResponse = res.data
    return data.body.article
  }
  catch (err) {
    console.log(err)
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
export async function updateArticle(articleId: string, title: string, body: string): Promise<Article | null> {
  try {
    const res: AxiosResponse<ApiResponses.CreateArticleResponse> = await axios.post(
      '/api/updateArticle',
      { articleId, title, body }
    )
    const data: ApiResponses.CreateArticleResponse = res.data
    return data.body.article
  }
  catch (err) {
    console.log(err)
    return null
  }
}

/**
 * TODO: after users added
 * @param articleId 
 * @param reaction 
 */
export async function addReaction(articleId: string, reaction: Reaction): Promise<void> {
  // TODO: rework to send actual emojis? make sure client can't mess with it tho... maybe better to keep as nums idk
  // TODO: tie reactions to user, persistent + block >1 reactions
  try {
    const res = await axios.post('/api/addReaction', { articleId, reaction })
    const data = res.data
    // TODO
    data
  }
  catch (err) {
    console.log(err)
    // TODO
    err
  }
}

