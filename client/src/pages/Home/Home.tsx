import { useEffect, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import Article from '../../components/Article/Article.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import CONSTANTS from '../../constants.ts'
import { getArticle } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function Home() {
  const origin: string = window.location.origin
  const navigate: NavigateFunction = useNavigate()

  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const searchInputElement = useRef<HTMLInputElement>(null)

  /**
   * Get a list of featured articles.
   * @returns The list of articles.
   */
  async function getFeaturedArticles(): Promise<ArticleType[]> {
    let featuredArticles: ArticleType[] = []
    for (let articleId of CONSTANTS.FEATURED_ARTICLE_IDS) {
      const responseArticle: ArticleType | null = await getArticle(articleId)
      if (responseArticle !== null) {
        featuredArticles.push(responseArticle)
      }
    }
    return featuredArticles
  }

  /**
   * Load the featured articles on screen.
   */
  async function loadFeaturedArticles(): Promise<void> {
    const featuredArticles: ArticleType[] = await getFeaturedArticles()
    setArticles(featuredArticles)
    setLoading(false)
  }

  /**
   * Search all articles by title.
   */
  function searchArticles(): void {
    const query: string = searchInputElement.current!.value
    if (query.length > 0) {
      navigate(`/search?query=${query}`)
    }
  }

  useEffect(() => {
    loadFeaturedArticles()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div>
        <button onClick={loadFeaturedArticles}>reload articles</button>
        <a href={`${origin}/write`}>
          <button>write article</button>
        </a>
        <input placeholder="search here" ref={searchInputElement}></input>
        <button onClick={searchArticles}>search</button>
      </div>
      <br />
      <h1>Featured articles:</h1>
      {articles.map((article) => (
        <Article key={article._id} data={article} />
      ))}
    </>
  )
}

export default Home
