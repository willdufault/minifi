import { useEffect, useRef, useState } from 'react'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router'
import Comment from '../../components/Comment/Comment.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NotFound from '../../components/NotFound/NotFound.tsx'
import CONSTANTS from '../../constants.ts'
import {
  addReaction,
  deleteArticle,
  getArticle,
} from '../../services/ArticleService.ts'
import { addComment } from '../../services/CommentService.ts'
import { Article as ArticleType } from '../../types/Article.ts'
import { Comment as CommentType } from '../../types/Comment.ts'
import { Reactions as ReactionsType } from '../../types/Reactions.ts'

function ArticleRead() {
  const origin: string = window.location.origin
  const location: Location = useLocation()
  const navigate: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<ArticleType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [commentLength, setCommentLength] = useState<number>(0)
  const commentInputElement = useRef<HTMLTextAreaElement>(null)

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
   * Delete the article and redirect the user to the homepage.
   */
  async function deleteArticleHandler(): Promise<void> {
    const deleted: boolean = await deleteArticle(articleId!)
    if (deleted) {
      navigate('/')
    }
  }

  /**
   * Add a comment to the article.
   */
  async function addCommentHandler(): Promise<void> {
    if (commentLength === 0) {
      return
    }

    if (commentLength > CONSTANTS.COMMENT_MAX_LENGTH) {
      alert(
        `Comment must be between 1 and ${CONSTANTS.COMMENT_MAX_LENGTH} characters.`
      )
      return
    }

    const responseComment: CommentType | null = await addComment(
      articleId!,
      commentInputElement.current!.value
    )
    if (responseComment !== null) {
      setArticle({
        ...article!,
        comments: [responseComment, ...article!.comments],
      })
      commentInputElement.current!.value = ''
      setCommentLength(0)
    }
  }

  /**
   * Add a reaction to the article.
   * @param reaction Reaction emoji.
   */
  async function addReactionHandler(reaction: string): Promise<void> {
    if (!CONSTANTS.REACTIONS.includes(reaction)) {
      alert(`Reaction must be one of [${CONSTANTS.REACTIONS}].`)
      return
    }

    const added: boolean = await addReaction(articleId!, reaction)
    if (added) {
      setArticle({
        ...article!,
        reactions: {
          ...article!.reactions,
          [reaction]: article!.reactions[reaction as keyof ReactionsType] + 1,
        },
      })
    }
  }

  /**
   * Load the article on the screen.
   */
  async function loadArticle(): Promise<void> {
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
    setLoading(false)
  }

  useEffect(() => {
    loadArticle()
  }, [])

  if (loading) {
    return <Loading />
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
        <em>topic: {article!.topic}</em>
        <p>body: {article!.body}</p>
        {Object.entries(article!.reactions).map(
          ([reaction, count]: [string, number]) => (
            <button key={reaction} onClick={() => addReactionHandler(reaction)}>
              {reaction} {count}
            </button>
          )
        )}
      </div>
      <br />
      <div style={{ border: 'solid green 1px', padding: '1rem' }}>
        <label>comment: </label>
        <textarea
          ref={commentInputElement}
          onChange={(event) => setCommentLength(event.target.value.length)}
        ></textarea>
        <p>
          {commentLength}/{CONSTANTS.COMMENT_MAX_LENGTH}
        </p>
        <button onClick={addCommentHandler}>submit</button>
      </div>
      <br />
      {article!.comments.map((comment: CommentType) => (
        <Comment key={comment._id} data={comment} />
      ))}
    </>
  )
}

export default ArticleRead
