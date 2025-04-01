import NotFound from '../NotFound/NotFound.tsx'
import { useEffect, useState } from "react"
import { Location, useLocation } from "react-router"
import { getArticle, addReaction } from "../../services/articleService.ts"
import { Article } from "../../types/Article.ts"
import { Reaction } from '../../types/Reaction.ts'

function ArticleRead() {
  const origin: string = window.location.origin
  const location: Location<any> = useLocation()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  const getArticleId = (location: Location<any>): string | null => {
    const queryParameters = new URLSearchParams(location.search)
    return queryParameters.get('id')
  }

  const articleId: string | null = getArticleId(location)

  useEffect(() => {
    const loadArticle = async () => {
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

    loadArticle()
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
      <div style={{ border: 'solid black 1px', padding: '1rem' }}>
        <h1>title: {article!.title}</h1>
        <p>body: {article!.body}</p>
        <button onClick={() => addReaction(article!._id, Reaction.ThumbsUp)}>👍 {article?.reactions[Reaction.ThumbsUp] ?? 0}</button>
        <button onClick={() => addReaction(article!._id, Reaction.ThumbsDown)}>👎 {article?.reactions[Reaction.ThumbsDown] ?? 0}</button>
      </div>
    </>
  )
}

export default ArticleRead
