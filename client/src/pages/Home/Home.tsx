import { useEffect, useState } from 'react'
import Article from '../../components/Article/Article.tsx'
import Container from '../../components/Container/Container.tsx'
import Divider from '../../components/Divider/Divider.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NavigationBar from '../../components/NavigationBar/NavigationBar.tsx'
import CONSTANTS from '../../constants.ts'
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
        {articles.map((article) => (
          <>
            <Divider />
            <Article key={article._id} data={article} />
          </>
        ))}
      </Container>
      <Footer />
    </>
  )
}

export default Home
