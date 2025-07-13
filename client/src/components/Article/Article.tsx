import { Link } from 'react-router'
import CONSTANTS from '../../constants.ts'
import { Article as ArticleType } from '../../types/Article.ts'

type Props = {
  data: ArticleType
}

function Article({ data }: Props) {
  const article: ArticleType = data

  /**
   * Get the first 100 characters of the body followed by an ellipsis.
   * @returns The truncated body.
   */
  function getTruncatedBody(): string {
    if (article.body.length < 100) {
      return article.body
    }
    return `${article.body.substring(0, 100)}...`
  }

  /**
   * Get the sum of all reaction counts.
   * @returns The total number of reactions.
   */
  function getReactionTotal(): number {
    let total = 0
    for (const count of Object.values(article.reactions)) {
      total += count
    }
    return total
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

  return (
    <>
      <div className="wrap-break-word">
        <Link
          className="font-bold text-xl w-fit mb-1 block hover:underline"
          to={`/read?id=${article._id}`}
        >
          {article.title}
        </Link>
        <p className="text-sm text-gray-500 mb-4">{getTruncatedBody()}</p>
        <p>
          {getFormattedDate(new Date(article.date))}&nbsp;&nbsp;•&nbsp;&nbsp;
          {CONSTANTS.TOPIC_TO_EMOJI[article.topic]} {article.topic}
          &nbsp;&nbsp;•&nbsp;&nbsp;👏 {getReactionTotal()}
          &nbsp;&nbsp;•&nbsp;&nbsp;💬 {article.comments.length}
        </p>
      </div>
    </>
  )
}

export default Article
