import axios from 'axios'
import { useEffect, useState } from "react"
import { Location, useLocation } from "react-router"
import { Article } from "../../types/Article.ts"
import { Reaction } from '../../types/Reaction.ts'
import NotFound from '../NotFound/NotFound.tsx'

function ArticleRead() {
  const location: Location<any> = useLocation()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  // TODO: tie reactions to user, persistent + block >1 reactions
  const addReaction = async (articleId: string, reaction: Reaction): Promise<void> => {
    try {
      const res = await axios.post('/api/addReaction', { articleId, reaction })
      const data = res.data
      // TODO
      data
    }
    catch (err) {
      console.log(err)
      // TODO
      err
    }
  }

  useEffect(() => {
    const getArticleId = (location: Location<any>): string | null => {
      const queryParameters = new URLSearchParams(location.search)
      return queryParameters.get('id')
    }

    const getArticle = async (articleId: string): Promise<Article | null> => {
      try {
        const res = await axios.get('/api/getArticle', { params: { articleId } })
        const data = res.data
        return data.body.article
      }
      catch (err) {
        console.log(err)
        return null
      }
    }

    const loadArticle = async () => {
      const articleId: string | null = getArticleId(location)
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
        setLoading(false)
      }
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
