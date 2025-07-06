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
   * Get the query from the query parameters.
   * @returns The query.
   */
  function getQuery(): string | null {
    const queryParameters: URLSearchParams = new URLSearchParams(location.search)
    return queryParameters.get('query')
  }

  const query: string | null = getQuery()

  /**
   * Load the search results on the screen.
   */
  async function loadSearchResults(): Promise<void> {
    if (query === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    const responseArticles: ArticleType[] | null = await searchArticles(query)
    if (responseArticles === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setArticles(responseArticles)
    setLoading(false)
  }

  useEffect(() => {
    loadSearchResults()
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
