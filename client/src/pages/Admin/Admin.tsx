import { faListUl, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Article from '../../components/Article/Article'
import Container from '../../components/Container/Container'
import Divider from '../../components/Divider/Divider'
import Footer from '../../components/Footer/Footer'
import IconButton from '../../components/IconButton/IconButton'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import { listArticles, purgeArticles } from '../../services/ArticleService'
import { Article as ArticleType } from '../../types/Article'

function Admin() {
  const [articles, setArticles] = useState<ArticleType[]>([])

  /**
   * List all articles on the page.
   */
  async function listArticlesHandler(): Promise<void> {
    const responseArticles: ArticleType[] | null = await listArticles()
    if (responseArticles !== null) {
      setArticles(responseArticles)
    }
  }
  /**
   * Delete all articles.
   */
  async function purgeArticlesHandler(): Promise<void> {
    const deleted: boolean = await purgeArticles()
    if (deleted) {
      setArticles([])
    }
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <h1 className="text-2xl font-bold">Admin panel</h1>
        <Divider />
        <div className="flex gap-4 mb-3">
          <IconButton
            icon={faListUl}
            text="List all"
            color="blue"
            callback={listArticlesHandler}
          />
          <IconButton
            icon={faTrash}
            text="Delete all"
            color="red"
            callback={purgeArticlesHandler}
          />
        </div>
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

export default Admin
