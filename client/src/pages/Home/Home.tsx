import { useEffect, useState } from 'react'
import { getArticles, deleteArticles } from '../../services/articleService.ts';
import { Article } from '../../types/Article.ts';
import { Reaction } from '../../types/Reaction.ts';

function Home() {
  const origin: string = window.location.origin

  const [articles, setArticles] = useState<Article[]>([])

  /**
   * Reload the articles on screen.
   */
  const reloadArticles = async (): Promise<void> => {
    const articles: Article[] = await getArticles()
    setArticles(articles)
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
