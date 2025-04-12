import { useEffect, useRef, useState } from 'react'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router'
import Comment from '../../components/Comment/Comment.tsx'
import CONSTANTS from '../../constants.ts'
import {
  addReaction,
  deleteArticle,
  getArticle,
} from '../../services/ArticleService.ts'
import { addComment } from '../../services/CommentService.ts'
import { Article } from '../../types/Article.ts'
import { Comment as CommentType } from '../../types/Comment.ts'
import { Reactions } from '../../types/Reactions.ts'
import NotFound from '../NotFound/NotFound.tsx'

function ArticleRead() {
  const origin: string = window.location.origin
  const location: Location<any> = useLocation()
  const navigator: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const commentInputElement = useRef<HTMLTextAreaElement>(null)
  const [commentLength, setCommentLength] = useState<number>(0)

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
   * Delete the article and return to the homepage.
   */
  const deleteArticleHandler = async (): Promise<void> => {
    const deleted: boolean = await deleteArticle(articleId!)
    if (deleted) {
      navigator('/')
    }
  }

  /**
   * Load the article on the screen.
   */
  const loadArticle = async (articleId: string | null): Promise<void> => {
    if (articleId === null) {
      setNotFound(true)
    } else {
      const responseArticle = await getArticle(articleId)
      if (responseArticle === null) {
        setNotFound(true)
      } else {
        setArticle(responseArticle)
      }
    }
    setLoading(false)
  }

  /**
   * Submit the comment to the current article.
   */
  async function submitComment(): Promise<void> {
    if (commentLength == 0 || commentLength > CONSTANTS.COMMENT_MAX_LENGTH) {
      alert(`Comment between 1 and ${CONSTANTS.COMMENT_MAX_LENGTH} characters.`)
      return
    }

    const comment: CommentType | null = await addComment(
      articleId!,
      commentInputElement.current!.value
    )
    if (comment !== null) {
      setArticle({
        ...article!,
        comments: [comment, ...article!.comments],
      })
    }
  }

  /**
   * Add a reaction to the current article.
   * @param reaction Reaction emoji.
   */
  const submitReaction = async (reaction: string): Promise<void> => {
    if (!CONSTANTS.REACTIONS.includes(reaction)) {
      alert(`Reaction must be one of [${CONSTANTS.REACTIONS}].`)
      return
    }

    await addReaction(articleId!, reaction)
    setArticle({
      ...article!,
      reactions: {
        ...article!.reactions,
        [reaction]: article!.reactions[reaction as keyof Reactions] + 1,
      },
    })
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
      <h1>article view</h1>
      <br />
      <a href={`${origin}/edit?id=${articleId}`}>
        <button>edit</button>
      </a>
      <button onClick={deleteArticleHandler}>delete</button>
      <div style={{ border: 'solid black 1px', padding: '1rem' }}>
        <h1>title: {article!.title}</h1>
        <p>body: {article!.body}</p>
        {Object.entries(article!.reactions).map(([reaction, count]) => (
          <button key={reaction} onClick={() => submitReaction(reaction)}>
            {reaction} {count}
          </button>
        ))}
      </div>
      <br />
      <div style={{ border: 'solid green 1px', padding: '1rem' }}>
        <label>comment</label>
        <textarea
          ref={commentInputElement}
          onChange={(event) => setCommentLength(event.target.value.length)}
        ></textarea>
        <p>
          {commentLength}/{CONSTANTS.COMMENT_MAX_LENGTH}
        </p>
        <br />
        <button onClick={submitComment}>submit</button>
      </div>
      <br />
      {article!.comments.map((comment: CommentType, index: number) => (
        <Comment key={index} data={comment} />
      ))}
    </>
  )
}

export default ArticleRead
