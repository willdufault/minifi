import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router'
import Comment from '../../components/Comment/Comment.tsx'
import Container from '../../components/Container/Container.tsx'
import Divider from '../../components/Divider/Divider.tsx'
import EmojiButton from '../../components/EmojiButton/EmojiButton.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import IconButton from '../../components/IconButton/IconButton.tsx'
import Loading from '../../components/Loading/Loading.tsx'
import NavigationBar from '../../components/NavigationBar/NavigationBar.tsx'
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
  const location: Location = useLocation()
  const navigate: NavigateFunction = useNavigate()

  const [article, setArticle] = useState<ArticleType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>('')

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
    if (commentText.length === 0) {
      return
    }

    if (commentText.length > CONSTANTS.COMMENT_MAX_LENGTH) {
      alert(
        `Comment must be between 1 and ${CONSTANTS.COMMENT_MAX_LENGTH} characters.`
      )
      return
    }

    const responseComment: CommentType | null = await addComment(
      articleId!,
      commentText
    )
    if (responseComment !== null) {
      setArticle({
        ...article!,
        comments: [responseComment, ...article!.comments],
      })
      setCommentText('')
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
   * Render comments title.
   * @param count The comment count.
   * @returns The comments title.
   */
  function renderCommentsTitle(count: number): ReactNode {
    return (
      <h2 className="font-bold text-xl mb-4">
        {count} Comment{count === 1 ? '' : 's'}
      </h2>
    )
  }

  /**
   * Render the length count.
   * @param current The current length.
   * @param limit The max length.
   * @returns The length count.
   */
  function renderLengthCount(current: number, limit: number): ReactNode {
    const colorClass: string =
      current > limit ? 'text-red-500' : 'text-gray-400'
    return (
      <p className={`text-xs text-right ${colorClass}`}>
        {current}/{limit}
      </p>
    )
  }

  /**
   * Render the comment button.
   * @returns The comment button.
   */
  function renderCommentButton(): ReactNode {
    const disabled: boolean =
      commentText.length === 0 ||
      commentText.length > CONSTANTS.COMMENT_MAX_LENGTH
    return (
      <IconButton
        icon={faCheck}
        text="Comment"
        color="green"
        disabled={disabled}
        callback={addCommentHandler}
      />
    )
  }

  /**
   * Get the date as a formatted string.
   * @param date The upload date.
   * @returns The formatted date.
   */
  function getFormattedDate(date: Date): string {
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const year: number = date.getFullYear()
    const month: string = months[date.getMonth()]
    const day: number = date.getDate()
    return `${month.substring(0, 3)} ${day}, ${year}`
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
      <NavigationBar />
      <Container>
        <div className="flex gap-4 justify-end mb-3">
          <IconButton
            icon={faPen}
            text="Edit"
            color="blue"
            callback={() => navigate(`/edit?id=${articleId}`)}
          />
          <IconButton
            icon={faTrash}
            text="Delete"
            color="red"
            callback={deleteArticleHandler}
          />
        </div>
        <h1 className="font-bold text-2xl mb-2">{article!.title}</h1>
        <p className="mb-4">
          {getFormattedDate(new Date(article!.date))}&nbsp;&nbsp;•&nbsp;&nbsp;
          {CONSTANTS.TOPIC_TO_EMOJI[article!.topic]} {article!.topic}
        </p>
        <div className="flex gap-2">
          {CONSTANTS.REACTIONS.map((reaction: string, index: number) => (
            <EmojiButton
              emoji={reaction}
              count={article!.reactions[reaction]}
              key={index}
              callback={() => addReactionHandler(reaction)}
            />
          ))}
        </div>
        <Divider />
        <p className="mb-4">{article!.body}</p>
        <Divider />
        {renderCommentsTitle(article!.comments.length)}
        <Divider />
        <input
          className="w-full outline-none border-b border-gray-400 focus:border-gray-600"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCommentText(event.target.value)
          }
        ></input>
        {renderLengthCount(commentText.length, CONSTANTS.COMMENT_MAX_LENGTH)}
        <div className="flex justify-end mt-2">{renderCommentButton()}</div>
        {article!.comments.map((comment: CommentType) => (
          <>
            <Divider />
            <Comment key={comment._id} data={comment} />
          </>
        ))}
      </Container>
      <Footer />
    </>
  )
}

export default ArticleRead
