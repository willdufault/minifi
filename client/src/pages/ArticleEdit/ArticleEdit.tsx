import { useRef } from "react"
import { NavigateFunction, useNavigate } from 'react-router';
import { createArticle } from "../../services/articleService";
import { Article } from '../../types/Article';



// TODO: THIS IS NEXT, ADD EDITING
function ArticleEdit() {
  const navigate: NavigateFunction = useNavigate()

  const titleInputElement = useRef<HTMLInputElement>(null);
  const bodyInputElement = useRef<HTMLTextAreaElement>(null);

  /**
   * Redirects the user to the read view of their article.
   * @param article The user's article.
   * @param navigate React navigate function.
   */
  function openArticleRead(article: Article, navigate: NavigateFunction): void {
    navigate(`/read?id=${article._id}`)
  }

  async function submitArticle(): Promise<void> {
    const article: Article | null = await createArticle(
      titleInputElement.current!.value, bodyInputElement.current!.value
    )
    if (article !== null) {
      openArticleRead(article, navigate)
    }
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

export default ArticleEdit
