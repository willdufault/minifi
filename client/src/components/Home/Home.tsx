import './Home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Article } from '../../types/Article.ts';
import { Reaction } from '../../types/Reaction.ts';

function Home() {
  // const usernameInputElement = useRef<HTMLInputElement>(null);
  // const passwordInputElement = useRef<HTMLInputElement>(null);
  // const [username, setUsername] = useState<String>("")
  const [articles, setArticles] = useState<Article[]>([])

  // TODO: rename to handler fcns and move to another file?
  // TODO: remove all console.logs
  // TODO: type all vars except stuff that includes generics (like useref/usestate)

  async function getArticles(): Promise<void> {
    const res = await axios.get('/api/getArticles')
    const data = res.data
    console.log(data)
    setArticles(data.body.articles)
  }

  async function createArticle(): Promise<void> {
    const res = await axios.post('/api/createArticle')
    const data = res.data
    console.log(data)
  }

  async function deleteArticles(): Promise<void> {
    const res = await axios.post('/api/deleteArticles')
    const data = res.data
    console.log(data)
  }

  async function addReaction(articleId: string, reaction: Reaction): Promise<void> {
    console.log(`*** article id: ${articleId}`)

    const res = await axios.post('/api/addReaction', { articleId, reaction })
    const data = res.data
    console.log(data)
    // TODO - search through listed articles and update the one with matching id
    // * but this depends on how i do it, could say only react when page is open (better this way imo, that way i don't have to render everything every time, lose filters, etc.)
    // ! do users last, complete anonymous functionality first
    // * also need to figure out how to handle users adding + removing + persistent reactions, later issue
  }

  function getArticleUrl(id: string): string {
    return `${window.location.origin}/article?id=${id}`
  }

  // async function logIn(): Promise<void> {
  //   const value: string = usernameInputElement.current!.value
  //   if (value.length > 0) {
  //     setUsername(value)
  //   }
  // }

  // function logOut(): void {
  //   setUsername("")
  // }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <div>
        {/* <p>username: [{username}]</p>
        <input ref={usernameInputElement}></input>
        <input ref={passwordInputElement}></input>
        <button onClick={logIn}>create user</button>
        <button onClick={logIn}>log in</button>
        <button onClick={logOut}>log out</button> */}
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
        <div key={index}>
          <div style={{ border: 'solid white 1px', padding: '1rem' }}>
            <a href={getArticleUrl(article._id)}>link</a>
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

export default Home
