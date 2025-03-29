import { useEffect, useRef, useState } from 'react'
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

  const usernameInputElement = useRef<HTMLInputElement>(null);
  const passwordInputElement = useRef<HTMLInputElement>(null);
  const [articles, setArticles] = useState<Article[]>([])
  const [username, setUsername] = useState<String>("")

  // TODO: rename to handler fcns and move to another file?

  async function getArticles(): Promise<void> {
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

  async function createArticle(): Promise<void> {
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

  async function deleteArticles(): Promise<void> {
    const res = await fetch('/deleteArticles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json)
    alert('printed deleteArticles output to console')
  }

  async function addReaction(articleId: string, reaction: Reaction): Promise<void> {
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
    // * but this depends on how i do it, could say only react when page is open (better this way imo, that way i don't have to render everything every time, lose fileters, etc.)
    // * also need to figure out how to handle users adding + removing + persistent reactions, later issue
  }

  function getArticleUrl(id: string): string {
    console.log(window.location)
    return `${window.location.origin}/article?id=${id}`
  }

  async function logIn(): Promise<void> {
    const value: string = usernameInputElement.current!.value
    if (value.length > 0) {
      setUsername(value)
    }
  }

  function logOut(): void {
    setUsername("")
  }

  // fetch articles on page load
  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <div>
        <p>username: [{username}]</p>
        <input ref={usernameInputElement}></input>
        <input ref={passwordInputElement}></input>
        <button onClick={logIn}>create user</button>
        <button onClick={logIn}>log in</button>
        <button onClick={logOut}>log out</button>
      </div>
      <br />
      <div>
        <button onClick={getArticles}>get articles</button>
        <button onClick={createArticle}>create article</button>
        <button onClick={deleteArticles}>delete articles</button>
      </div>
      <br />
      <h1>Articles:</h1>
      {articles.map((article, index) =>
        <a key={index} href={getArticleUrl(article._id)}>
          <div style={{ border: 'solid white 1px', padding: '1rem' }}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <button onClick={() => addReaction(article._id, Reaction.ThumbsUp)}>👍 {article.reactions[Reaction.ThumbsUp] ?? 0}</button>
            <button onClick={() => addReaction(article._id, Reaction.ThumbsDown)}>👎 {article.reactions[Reaction.ThumbsDown] ?? 0}</button>
          </div>
        </a>
      )}
    </>
  )
}

export default App
