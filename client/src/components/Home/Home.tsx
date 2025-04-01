import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { DeleteArticlesResponse, GetArticlesResponse } from '../../types/ApiResponses.ts';
import { Article } from '../../types/Article.ts';
import { Reaction } from '../../types/Reaction.ts';

function Home() {
  const origin: string = window.location.origin

  const [articles, setArticles] = useState<Article[]>([])

  /**
   * Fetches list of articles from database.
   * @returns The list of articles.
   */
  const getArticles = async (): Promise<Article[]> => {
    const res: AxiosResponse<GetArticlesResponse> = await axios.get('/api/getArticles')
    const data: GetArticlesResponse = res.data
    return data.body.articles
  }

  /**
   * Reload the articles on screen.
   */
  const reloadArticles = async (): Promise<void> => {
    const articles: Article[] = await getArticles()
    setArticles(articles)
  }

  // TODO: remove this fcn after delete single article is done
  /**
   * TEMP - Delete all articles from the database.
   */
  const deleteArticles = async (): Promise<void> => {
    const res: AxiosResponse<DeleteArticlesResponse> = await axios.post('/api/deleteArticles')
    const data: DeleteArticlesResponse = res.data
    console.log(data)
  }

  useEffect(() => {
    reloadArticles()
  }, [])

  return (
    <>
      <div>
        <button onClick={reloadArticles}>reload articles</button>
        <a href={`${origin}/write`}>
          <button>write article</button>
        </a>
        <button onClick={deleteArticles}>delete all articles</button>
      </div>
      <br />
      <h1>Articles:</h1>
      {articles.map((article, index) =>
        <div key={index}>
          <div style={{ border: 'solid black 1px', padding: '1rem' }}>
            <a href={`${origin}/read?id=${article._id}`}>link</a>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <p>👍 {article?.reactions[Reaction.ThumbsUp]}</p>
            <p>👎 {article?.reactions[Reaction.ThumbsDown]}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
