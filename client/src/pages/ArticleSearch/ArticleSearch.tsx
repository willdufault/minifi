import { ReactNode, useEffect, useState } from 'react'
import { Location, useLocation } from 'react-router'
import Article from '../../components/Article/Article.tsx'
import Container from '../../components/Container/Container.tsx'
import Divider from '../../components/Divider/Divider.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NavigationBar from '../../components/NavigationBar/NavigationBar.tsx'
import NotFound from '../../components/NotFound/NotFound.tsx'
import { searchArticles } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function ArticleSearch() {
  const location: Location = useLocation()

  const [query, setQuery] = useState<string>('')
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  /**
   * Get the query from the query parameters.
   * @returns The query.
   */
  function getQuery(): string {
    const queryParameters: URLSearchParams = new URLSearchParams(
      location.search
    )
    return queryParameters.get('query') ?? ''
  }

  /**
   * Render the search results.
   * @returns The search results.
   */
  function renderResults(): ReactNode {
    if (articles.length === 0) {
      return (
        <>
          <Divider />
          <p>No results. Please try another search.</p>
        </>
      )
    }
    return articles.map((article) => (
      <>
        <Divider />
        <Article key={article._id} data={article} />
      </>
    ))
  }

  /**
   * Load the search results on the screen.
   */
  async function loadSearchResults(): Promise<void> {
    const newQuery: string = getQuery()
    const responseArticles: ArticleType[] | null = await searchArticles(
      newQuery
    )
    if (responseArticles === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setQuery(newQuery)
    setArticles(responseArticles)
    setLoading(false)
  }

  useEffect(() => {
    loadSearchResults()
  }, [location.search])

  if (loading) {
    return <Loading />
  }

  if (notFound) {
    return <NotFound />
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <h1 className="text-2xl font-bold">Results for "{query}"</h1>
        {renderResults()}
      </Container>
      <Footer />
    </>
  )
}

export default ArticleSearch
