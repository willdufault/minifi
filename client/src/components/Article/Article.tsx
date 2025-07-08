import { Link } from 'react-router'
import CONSTANTS from '../../constants.ts'
import { Article as ArticleType } from '../../types/Article.ts'

type Props = {
  data: ArticleType
}

function Article({ data }: Props) {
  const article: ArticleType = data

  function getTruncatedBody(): string {
    if (article.body.length < 100) {
      return article.body
    }
    return `${article.body.substring(0, 100)}...`
  }

  function getReactionTotal(): number {
    let total = 0
    for (const count of Object.values(article.reactions)) {
      total += count
    }
    return total
  }

  return (
    <>
      <div>
        <Link
          className="font-bold text-xl w-fit mb-1 block hover:underline"
          to={`/read?id=${article._id}`}
        >
          {article.title}
        </Link>
        <p className="text-sm text-gray-500 mb-4">{getTruncatedBody()}</p>
        <p>
          {CONSTANTS.TOPIC_TO_EMOJI[article.topic]} {article.topic}
          &nbsp;&nbsp;•&nbsp;&nbsp;👏 {getReactionTotal()}
          &nbsp;&nbsp;•&nbsp;&nbsp;💬 {article.comments.length}
        </p>
      </div>
    </>
  )
}

export default Article
