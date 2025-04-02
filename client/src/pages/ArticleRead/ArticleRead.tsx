import NotFound from '../NotFound/NotFound.tsx'
import { useEffect, useState } from "react"
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router"
import { getArticle, deleteArticle, addReaction } from "../../services/articleService.ts"
import { Article } from "../../types/Article.ts"
import { Reaction } from '../../types/Reaction.ts'

function ArticleRead() {
  const origin: string = window.location.origin
  const location: Location<any> = useLocation()
  const navigator: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  /**
   * Get the article ID from the query parameters.
   * @returns The article ID.
   */
  const getArticleId = (): string | null => {
    const queryParameters = new URLSearchParams(location.search)
    return queryParameters.get('id')
  }

  const articleId: string | null = getArticleId()

  /**
   * Delete the article and return to the homepage.
   */
  const deleteArticleHandler = async (): Promise<void> => {
    const deleted: boolean = await deleteArticle(articleId!)
    if (deleted) {
      navigator('/')
    }
  }

  /**
   * Load the article on the screen.
   */
  const loadArticle = async (articleId: string | null) => {
    if (articleId === null) {
      setNotFound(true)
    }
    else {
      const responseArticle = await getArticle(articleId)
      if (responseArticle === null) {
        setNotFound(true)
      }
      else {
        setArticle(responseArticle)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    loadArticle(articleId)
  }, [])

  if (loading) {
    return <p>loading...</p>
  }

  if (notFound) {
    return <NotFound />
  }

  return (
    <>
      <h1>article view</h1>
      <br />
      <a href={`${origin}/edit?id=${articleId}`}>
        <button>edit</button>
      </a>
      <button onClick={deleteArticleHandler}>delete</button >
      <div style={{ border: 'solid black 1px', padding: '1rem' }}>
        <h1>title: {article!.title}</h1>
        <p>body: {article!.body}</p>
        <button onClick={() => addReaction(articleId!, Reaction.ThumbsUp)}>👍 {article?.reactions[Reaction.ThumbsUp] ?? 0}</button>
        <button onClick={() => addReaction(articleId!, Reaction.ThumbsDown)}>👎 {article?.reactions[Reaction.ThumbsDown] ?? 0}</button>
      </div>
    </>
  )
}

export default ArticleRead
