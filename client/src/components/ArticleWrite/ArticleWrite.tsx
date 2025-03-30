import axios, { AxiosResponse } from 'axios'
import { useRef, RefObject } from "react"
import { NavigateFunction, useNavigate } from 'react-router';
import { CreateArticleResponse } from '../../types/ApiResponses';
import { Article } from '../../types/Article';

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const titleInputElement = useRef<HTMLInputElement>(null);
  const bodyInputElement = useRef<HTMLTextAreaElement>(null);

  // TODO use prettier to auto-format?
  /**
   * Creates the user's article in the database.
   * @param titleInputElement Title input element.
   * @param bodyInputElement Body textarea element.
   * @returns The user's article.
   */
  async function createArticle(titleInputElement: RefObject<HTMLInputElement>, bodyInputElement: RefObject<HTMLTextAreaElement>): Promise<Article> {
    const res: AxiosResponse<CreateArticleResponse> = await axios.post('/api/createArticle', {
      'title': titleInputElement.current?.value,
      'body': bodyInputElement.current?.value,
    })
    const data: CreateArticleResponse = res.data
    return data.body.article
  }

  /**
   * Redirects the user to the read view of their article.
   * @param article The user's article.
   * @param navigate React navigate function.
   */
  function openArticleRead(article: Article, navigate: NavigateFunction): void {
    navigate(`/read?id=${article._id}`)
  }

  async function submitArticle(): Promise<void> {
    const article: Article = await createArticle(titleInputElement, bodyInputElement)
    openArticleRead(article, navigate)
  }

  return (
    <>
      <h1>article write</h1>
      <br />
      <div>
        <label>title</label>
        <input ref={titleInputElement} />
      </div>
      <br />
      <div>
        <label>body</label>
        <textarea ref={bodyInputElement}></textarea>
      </div>
      <br />
      <button onClick={submitArticle}>submit</button>
    </>
  )
}

export default ArticleWrite
