import { useEffect, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import CONSTANTS from '../../constants'
import { getArticle, updateArticle } from '../../services/ArticleService'
import { Article } from '../../types/Article'
import NotFound from '../NotFound/NotFound'

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [titleLength, setTitleLength] = useState<number>(0)
  const [bodyLength, setBodyLength] = useState<number>(0)
  const titleInputElement = useRef<HTMLInputElement>(null)
  const bodyInputElement = useRef<HTMLTextAreaElement>(null)

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
   * Redirects the user to the read view of their article.
   * @param article The user's article.
   */
  function openArticleRead(articleId: string): void {
    navigate(`/read?id=${articleId}`)
  }

  /**
   * Update the article in the database.
   */
  async function updateArticleHandler(articleId: string): Promise<void> {
    if (titleLength == 0 || titleLength > CONSTANTS.TITLE_MAX_LENGTH) {
      alert(
        `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`
      )
      return
    }
    if (bodyLength == 0 || bodyLength > CONSTANTS.BODY_MAX_LENGTH) {
      alert(
        `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`
      )
      return
    }

    const article: Article | null = await updateArticle(
      articleId,
      titleInputElement.current!.value,
      bodyInputElement.current!.value
    )
    if (article !== null) {
      openArticleRead(article._id)
    }
  }

  /**
   * Load the article into the input fields.
   */
  const loadArticle = async (articleId: string | null) => {
    if (articleId === null) {
      setNotFound(true)
    } else {
      const responseArticle = await getArticle(articleId)
      if (responseArticle === null) {
        setNotFound(true)
      } else {
        setArticle(responseArticle)
        setTitleLength(responseArticle.title.length)
        setBodyLength(responseArticle.body.length)
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
      <h1>article edit</h1>
      <br />
      <div>
        <label>title</label>
        <input
          ref={titleInputElement}
          defaultValue={article!.title}
          onChange={(event) => setTitleLength(event.target.value.length)}
        />
        <p>
          {titleLength}/{CONSTANTS.TITLE_MAX_LENGTH}
        </p>
      </div>
      <br />
      <div>
        <label>body</label>
        <textarea
          ref={bodyInputElement}
          defaultValue={article!.body}
          onChange={(event) => setBodyLength(event.target.value.length)}
        ></textarea>
        <p>
          {bodyLength}/{CONSTANTS.BODY_MAX_LENGTH}
        </p>
      </div>
      <br />
      <button onClick={() => updateArticleHandler(articleId!)}>update</button>
    </>
  )
}

export default ArticleWrite
