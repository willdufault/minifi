import { useEffect, useRef, useState } from "react"
import { NavigateFunction, useNavigate } from 'react-router';
import { updateArticle, getArticle } from "../../services/articleService";
import { Article } from '../../types/Article';
import NotFound from "../NotFound/NotFound";

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const titleInputElement = useRef<HTMLInputElement>(null);
  const bodyInputElement = useRef<HTMLTextAreaElement>(null);

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
      <h1>article edit</h1>
      <br />
      <div>
        <label>title</label>
        <input ref={titleInputElement} defaultValue={article!.title} />
      </div>
      <br />
      <div>
        <label>body</label>
        <textarea ref={bodyInputElement} defaultValue={article!.body}></textarea>
      </div>
      <br />
      <button onClick={() => updateArticleHandler(articleId!)}>update</button>
    </>
  )
}

export default ArticleWrite
