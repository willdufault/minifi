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
 * TODO: remove this fcn after delete single article is done
 * TEMP - Delete all articles from the database.
*/
export async function deleteArticles(): Promise<void> {
  const res: AxiosResponse<ApiResponses.DeleteArticlesResponse> = await axios.post('/api/deleteArticles')
  const data: ApiResponses.DeleteArticlesResponse = res.data
  console.log('TEMP!')
  console.log(data)
}

// TODO use prettier to auto-format?
/**
 * Create an article in the database.
 * @param title The title of the article.
 * @param body The body of the article.
 * @returns The article.
 */
export async function createArticle(title: string, body: string): Promise<Article | null> {
  try {
    const res: AxiosResponse<ApiResponses.CreateArticleResponse> = await axios.post('/api/createArticle', {
      'title': title,
      'body': body,
    })
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