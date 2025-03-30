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
  const [error, setError] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)

  // TODO: tie reactions to user, persistent + block >1 reactions
  async function addReaction(articleId: string, reaction: Reaction): Promise<void> {
    const res = await axios.post('/api/addReaction', { articleId, reaction })
    const data = res.data
    console.log(data)
  }

  useEffect(() => {
    function getArticleId(location: Location<any>): string | null {
      const queryParameters = new URLSearchParams(location.search)
      return queryParameters.get('id')
    }

    async function getArticle(articleId: string): Promise<Article> {
      try {
        const res = await axios.get('/api/getArticle', { params: { articleId } })
        console.log('res')
        console.log(res)
        const data = res.data
        console.log(data)
        return data.body.article
      }
      // TODO: PICK UP HERE... add catch + else logic for if 400 status
    }

    async function loadArticle() {
      const articleId: string | null = getArticleId(location)
      if (articleId === null) {
        setNotFound(true)
      }
      else {
        console.log('bef')
        const responseArticle = await getArticle(articleId)
        console.log('resp art:')
        console.log(responseArticle)
        if (responseArticle === null) {
          setError(true)
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

  if (error) {
    return <p>error!</p>
  }

  console.log(loading, error, notFound)

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
