import { useEffect, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import CONSTANTS from '../../constants'
import { getArticle, updateArticle } from '../../services/ArticleService'
import { Article as ArticleType } from '../../types/Article'

function ArticleEdit() {
  const origin: string = window.location.origin
  const navigate: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<ArticleType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [titleLength, setTitleLength] = useState<number>(0)
  const [bodyLength, setBodyLength] = useState<number>(0)
  const titleInputElement = useRef<HTMLInputElement>(null)
  const bodyInputElement = useRef<HTMLTextAreaElement>(null)
  const topicSelectElement = useRef<HTMLSelectElement>(null)

  /**
   * Get the article ID from the query parameters.
   * @returns The article ID.
   */
  function getArticleId(): string | null {
    const queryParameters: URLSearchParams = new URLSearchParams(
      location.search
    )
    return queryParameters.get('id')
  }

  const articleId: string | null = getArticleId()

  /**
   * Update the article and redirect the user to the read view of their article.
   */
  async function updateArticleHandler(): Promise<void> {
    if (titleLength === 0 || bodyLength === 0) {
      return
    }

    if (titleLength > CONSTANTS.TITLE_MAX_LENGTH) {
      alert(
        `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`
      )
      return
    }
    if (bodyLength > CONSTANTS.BODY_MAX_LENGTH) {
      alert(
        `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`
      )
      return
    }
    if (!CONSTANTS.TOPICS.includes(topicSelectElement.current!.value)) {
      alert(`Topic must be one of [${CONSTANTS.TOPICS}].`)
      return
    }

    const responseArticle: ArticleType | null = await updateArticle(
      articleId!,
      titleInputElement.current!.value,
      bodyInputElement.current!.value,
      topicSelectElement.current!.value
    )
    if (responseArticle !== null) {
      navigate(`/read?id=${articleId}`)
    }
  }

  /**
   * Load the article into the input fields.
   */
  async function loadArticleFields(): Promise<void> {
    if (articleId === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    const responseArticle: ArticleType | null = await getArticle(articleId)
    if (responseArticle === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setArticle(responseArticle)
    setTitleLength(responseArticle!.title.length)
    setBodyLength(responseArticle!.body.length)
    setLoading(false)
  }

  useEffect(() => {
    loadArticleFields()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (notFound) {
    return <NotFound />
  }

  return (
    <>
      <h1>article edit</h1>
      <br />
      <div>
        <label>title: </label>
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
        <label>topic: </label>
        <select ref={topicSelectElement} defaultValue={article!.topic}>
          {CONSTANTS.TOPICS.map((topic: string, index: number) => (
            <option key={index}>{topic}</option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label>body: </label>
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
      <button onClick={updateArticleHandler}>update</button>
      <a href={`${origin}/read?id=${articleId}`}>
        <button>cancel</button>
      </a>
    </>
  )
}

export default ArticleEdit
