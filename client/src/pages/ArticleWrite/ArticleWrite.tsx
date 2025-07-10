import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import Container from '../../components/Container/Container'
import Divider from '../../components/Divider/Divider'
import Footer from '../../components/Footer/Footer'
import IconButton from '../../components/IconButton/IconButton'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import CONSTANTS from '../../constants'
import { createArticle } from '../../services/ArticleService'
import { Article as ArticleType } from '../../types/Article'

function ArticleWrite() {
  const navigate: NavigateFunction = useNavigate()

  const [titleLength, setTitleLength] = useState<number>(0)
  const [bodyLength, setBodyLength] = useState<number>(0)
  const titleInputElement = useRef<HTMLInputElement>(null)
  const bodyInputElement = useRef<HTMLTextAreaElement>(null)
  const topicSelectElement = useRef<HTMLSelectElement>(null)

  /**
   * Create an article and redirect the user to the read view of their article.
   */
  async function createArticleHandler(): Promise<void> {
    if (titleLength === 0 || bodyLength === 0) {
      return
    }

    if (titleLength > CONSTANTS.TITLE_MAX_LENGTH) {
      alert(
        `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`
      )
      return
    }
    if (bodyLength > CONSTANTS.BODY_MAX_LENGTH) {
      alert(
        `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`
      )
      return
    }

    // Remove emoji and space from start and extra space from end.
    const topic: string = Array.from(topicSelectElement.current!.value)
      .slice(2, -1)
      .join('')
    console.log(topic)
    if (!CONSTANTS.TOPICS.includes(topic)) {
      alert(`Topic must be one of [${CONSTANTS.TOPICS}].`)
      return
    }

    const responseArticle: ArticleType | null = await createArticle(
      titleInputElement.current!.value,
      bodyInputElement.current!.value,
      topic
    )
    if (responseArticle !== null) {
      navigate(`/read?id=${responseArticle._id}`)
    }
  }

  /**
   */
  /**
   * Render the length count.
   * @param current The current length.
   * @param limit The max length.
   * @returns The length count.
   */
  function renderLengthCount(current: number, limit: number): ReactNode {
    const colorClass: string =
      current > limit ? 'text-red-400' : 'text-gray-400'
    return (
      <p className={`text-xs text-right ${colorClass}`}>
        {current}/{limit}
      </p>
    )
  }

  /**
   * Render the submit button.
   * @returns The submit button.
   */
  function renderSubmitButton(): ReactNode {
    const disabled: boolean =
      titleLength === 0 ||
      titleLength > CONSTANTS.TITLE_MAX_LENGTH ||
      bodyLength === 0 ||
      bodyLength > CONSTANTS.BODY_MAX_LENGTH
    return (
      <IconButton
        icon={faCheck}
        text="Submit"
        color="green"
        disabled={disabled}
        callback={createArticleHandler}
      />
    )
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <input
          className="font-bold text-xl w-full outline-none"
          ref={titleInputElement}
          placeholder="Your title"
          onChange={(event) => setTitleLength(event.target.value.length)}
        />
        {renderLengthCount(titleLength, CONSTANTS.TITLE_MAX_LENGTH)}
        <div className="border border-gray-400 hover:border-gray-600 focus-within:border-gray-600 p-2 w-fit rounded-full">
          <select
            ref={topicSelectElement}
            defaultValue={CONSTANTS.TOPICS[0]}
            className="outline-none"
          >
            {CONSTANTS.TOPICS.map((topic: string, index: number) => (
              <option key={index}>
                {CONSTANTS.TOPIC_TO_EMOJI[topic]} {topic}&nbsp;
              </option>
            ))}
          </select>
        </div>
        <Divider />
        <textarea
          className="w-full h-64 outline-none"
          ref={bodyInputElement}
          placeholder="Your thoughts..."
          onChange={(event) => setBodyLength(event.target.value.length)}
        ></textarea>
        {renderLengthCount(bodyLength, CONSTANTS.BODY_MAX_LENGTH)}
        <div className="mt-4 flex justify-end gap-4">
          <IconButton
            icon={faXmark}
            text="Cancel"
            color="red"
            callback={() => navigate('/')}
          />
          {renderSubmitButton()}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default ArticleWrite
