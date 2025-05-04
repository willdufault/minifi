import { useEffect, useState } from 'react'
import Article from '../../components/Article/Article.tsx'
import { getArticles } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function Home() {
  const origin: string = window.location.origin

  const [articles, setArticles] = useState<ArticleType[]>([])

  /**
   * Load the articles on screen.
   */
  const loadArticles = async (): Promise<void> => {
    const articles: ArticleType[] | null = await getArticles()
    if (articles !== null) {
      setArticles(articles)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  return (
    <>
      <div>
        <button onClick={loadArticles}>reload articles</button>
        <a href={`${origin}/write`}>
          <button>write article</button>
        </a>
      </div>
      <br />
      <h1>Articles:</h1>
      {articles.map((article) => (
        <Article key={article._id} data={article} />
      ))}
    </>
  )
}

export default Home
