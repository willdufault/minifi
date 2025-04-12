import { Article as ArticleType } from '../../types/Article.ts'

type Props = {
  article: ArticleType
}

function Article({ article }: Props) {
  return (
    <>
      <div style={{ border: 'solid black 1px', padding: '1rem' }}>
        <a href={`${origin}/read?id=${article._id}`}>link</a>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        {Object.entries(article.reactions).map(([reaction, count]) => (
          <p key={reaction}>
            {reaction} {count}
          </p>
        ))}
      </div>
    </>
  )
}

export default Article
