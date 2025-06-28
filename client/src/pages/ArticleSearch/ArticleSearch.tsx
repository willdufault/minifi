import { useEffect, useState } from 'react'
import Article from '../../components/Article/Article.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NotFound from '../../components/NotFound/NotFound.tsx'
import { searchArticles } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function ArticleSearch() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  /**
   * Get the search query from the query parameters.
   * @returns The search query.
   */
  const getQuery = (): string | null => {
    const queryParameters = new URLSearchParams(location.search)
    return queryParameters.get('query')
  }

  const query: string | null = getQuery()

  /**
   * Load the article on the screen.
   */
  const loadArticles = async (): Promise<void> => {
    if (query === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    const responseArticles = await searchArticles(query)
    if (responseArticles === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setArticles(responseArticles)
    setLoading(false)
  }

  useEffect(() => {
    loadArticles()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (notFound) {
    return <NotFound />
  }

  return (
    <>
      <h1>article search</h1>
      <br />
      <h1>Results for "{query}":</h1>
      {articles.map((article) => (
        <Article key={article._id} data={article} />
      ))}
    </>
  )
}

export default ArticleSearch
