import axios from 'axios'
import { useRef } from "react"

function ArticleWrite() {
  const titleInputElement = useRef<HTMLInputElement>(null);
  const bodyInputElement = useRef<HTMLTextAreaElement>(null);


  async function submitArticle(): Promise<void> {
    const res = await axios.post('/api/createArticle', {
      'title': titleInputElement.current?.value,
      'body': bodyInputElement.current?.value,
    })
    const data = res.data
    console.log(data)
  }

  return (
    <>
      <h1>article write</h1>
      <br />
      <div>
        <label>title</label>
        <input ref={titleInputElement} />
      </div>
      <br />
      <div>
        <label>body</label>
        <textarea ref={bodyInputElement}></textarea>
      </div>
      <br />
      <button onClick={submitArticle}>submit</button>
    </>
  )
}

export default ArticleWrite
