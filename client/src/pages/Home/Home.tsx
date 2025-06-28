import { useEffect, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import Article from '../../components/Article/Article.tsx'
import { getArticles } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function Home() {
  const origin: string = window.location.origin
  const navigate: NavigateFunction = useNavigate()

  const [articles, setArticles] = useState<ArticleType[]>([])
  const searchInputElement = useRef<HTMLInputElement>(null)

  /**
   * Load the articles on screen.
   */
  const loadArticles = async (): Promise<void> => {
    const articles: ArticleType[] | null = await getArticles()
    if (articles !== null) {
      setArticles(articles)
    }
  }

  /**
   * Search all articles by title.
   */
  const searchArticles = (): void => {
    const query: string = searchInputElement.current!.value
    if (query.length > 0) {
      navigate(`/search?query=${query}`)
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
        <input placeholder="search here" ref={searchInputElement}></input>
        <button onClick={searchArticles}>search</button>
      </div>
      <br />
      {/* //TODO: have fixed list of featured articles so no db fetch or "Loading..." required*/}
      <h1>Articles:</h1>
      {articles.map((article) => (
        <Article key={article._id} data={article} />
      ))}
    </>
  )
}

export default Home
