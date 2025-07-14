import { ReactNode, useEffect, useState } from 'react'
import Article from '../../components/Article/Article.tsx'
import Container from '../../components/Container/Container.tsx'
import Divider from '../../components/Divider/Divider.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NavigationBar from '../../components/NavigationBar/NavigationBar.tsx'
import { getArticle } from '../../services/ArticleService.ts'
import { Article as ArticleType } from '../../types/Article.ts'

function Home() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  /**
   * Get a list of featured articles.
   * @returns The list of featured articles.
   */
  async function getFeaturedArticles(): Promise<ArticleType[]> {
    let featuredArticles: ArticleType[] = []
    // TODO REWORK TO BE ON DB-END
    for (let articleId of []) {
      const responseArticle: ArticleType | null = await getArticle(articleId)
      if (responseArticle !== null) {
        featuredArticles.push(responseArticle)
      }
    }
    return featuredArticles
  }

  /**
   * Render the featured articles.
   * @returns The featured articles.
   */
  function renderFeaturedArticles(): ReactNode {
    if (articles.length === 0) {
      return (
        <>
          <Divider />
          <p>No featured articles.</p>
        </>
      )
    }
    return articles.map((article: ArticleType) => (
      <>
        <Divider />
        <Article key={article._id} data={article} />
      </>
    ))
  }

  /**
   * Load the featured articles on screen.
   */
  async function loadFeaturedArticles(): Promise<void> {
    const featuredArticles: ArticleType[] = await getFeaturedArticles()
    setArticles(featuredArticles)
    setLoading(false)
  }

  useEffect(() => {
    loadFeaturedArticles()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <h1 className="text-2xl font-bold">Featured</h1>
        {renderFeaturedArticles()}
      </Container>
      <Footer />
    </>
  )
}

export default Home
