import { useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import CONSTANTS from '../../constants'
import { createArticle } from '../../services/ArticleService'
import { Article } from '../../types/Article'

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const titleInputElement = useRef<HTMLInputElement>(null)
  const bodyInputElement = useRef<HTMLTextAreaElement>(null)
  const [titleLength, setTitleLength] = useState<number>(0)
  const [bodyLength, setBodyLength] = useState<number>(0)

  /**
   * Redirects the user to the read view of their article.
   * @param article The user's article.
   */
  function openArticleRead(articleId: string): void {
    navigate(`/read?id=${articleId}`)
  }

  /**
   * Submit the article to the database.
   */
  async function submitArticle(): Promise<void> {
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

    const article: Article | null = await createArticle(
      titleInputElement.current!.value,
      bodyInputElement.current!.value
    )
    if (article !== null) {
      openArticleRead(article._id)
    }
  }

  return (
    <>
      <h1>article write</h1>
      <br />
      <div>
        <label>title</label>
        <input
          ref={titleInputElement}
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
          onChange={(event) => setBodyLength(event.target.value.length)}
        ></textarea>
        <p>
          {bodyLength}/{CONSTANTS.BODY_MAX_LENGTH}
        </p>
      </div>
      <br />
      <button onClick={submitArticle}>submit</button>
    </>
  )
}

export default ArticleWrite
