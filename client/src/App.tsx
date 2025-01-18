import { useEffect, useState } from 'react'
import './App.css'

function App() {
  enum Reaction {
    ThumbsUp,
    ThumbsDown
  }

  interface Article {
    _id: string,
    title: string,
    body: string
    reactions: { [key: number]: number }
  }

  const [articles, setArticles] = useState<Article[]>([])

  // TODO - rename to handler fcns and move to another file?

  async function getArticles() {
    const res = await fetch('/getArticles', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['articles'])
    alert('printed articles to console')
    setArticles(json['body']['articles'])
  }

  async function createArticle() {
    const res = await fetch('/createArticle', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['article'])
    alert('printed new article to console')
  }

  async function deleteArticles() {
    const res = await fetch('/deleteArticles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json['body']['message'])
    alert('printed deleteArticles output to console')
  }

  async function addReaction(articleId: string, reaction: Reaction) {
    console.log(`*** article id: ${articleId}`)

    const res = await fetch('/addReaction', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        'articleId': articleId,
        'reaction': reaction
      })
    })
    const json = await res.json()
    console.log(json)
    // TODO - search through listed articles and update the one with matching id
  }

  // fetch articles on page load
  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <div>
        <button onClick={getArticles}>get articles</button>
        <button onClick={createArticle}>create article</button>
        <button onClick={deleteArticles}>delete articles</button>
      </div>
      <br />
      <h1>Articles:</h1>
      {articles.map((article, index) =>
        <div key={index}>
          <div style={{ border: 'solid white 1px', padding: '1rem' }}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <button onClick={() => addReaction(article._id, Reaction.ThumbsUp)}>👍 {article.reactions[Reaction.ThumbsUp] ?? 0}</button>
            <button onClick={() => addReaction(article._id, Reaction.ThumbsDown)}>👎 {article.reactions[Reaction.ThumbsDown] ?? 0}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
