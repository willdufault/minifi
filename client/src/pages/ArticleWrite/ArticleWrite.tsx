import { useRef } from "react"
import { NavigateFunction, useNavigate } from 'react-router';
import { createArticle } from "../../services/articleService";
import { Article } from '../../types/Article';

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const titleInputElement = useRef<HTMLInputElement>(null);
  const bodyInputElement = useRef<HTMLTextAreaElement>(null);

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
    const article: Article | null = await createArticle(
      titleInputElement.current!.value, bodyInputElement.current!.value
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
