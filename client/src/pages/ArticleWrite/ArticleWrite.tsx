import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, ReactNode, useState } from 'react'
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

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [topic, setTopic] = useState<string>(CONSTANTS.TOPICS[0])

  /**
   * Extract the topic from the dropdown option.
   * @param option The dropdown option.
   * @returns The topic.
   */
  function extractTopic(option: string): string {
    // Remove the emoji and space from the start.
    return option.split(' ')[1]
  }

  /**
   * Create an article and redirect the user to the read view of their article.
   */
  async function createArticleHandler(): Promise<void> {
    if (title.length === 0 || body.length === 0) {
      return
    }

    if (title.length > CONSTANTS.TITLE_MAX_LENGTH) {
      alert(
        `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`
      )
      return
    }
    if (body.length > CONSTANTS.BODY_MAX_LENGTH) {
      alert(
        `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`
      )
      return
    }
    if (!CONSTANTS.TOPICS.includes(topic)) {
      alert(`Topic must be one of [${CONSTANTS.TOPICS}].`)
      return
    }

    const responseArticle: ArticleType | null = await createArticle(
      title,
      body,
      topic
    )
    if (responseArticle !== null) {
      navigate(`/read?id=${responseArticle._id}`)
    }
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
   * Render the publish button.
   * @returns The publish button.
   */
  function renderPublishButton(): ReactNode {
    const disabled: boolean =
      title.length === 0 ||
      title.length > CONSTANTS.TITLE_MAX_LENGTH ||
      body.length === 0 ||
      body.length > CONSTANTS.BODY_MAX_LENGTH
    return (
      <IconButton
        icon={faCheck}
        text="Publish"
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
          className="font-bold text-xl w-full outline-none border-b border-gray-400 focus:border-gray-600"
          placeholder="Your title"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        {renderLengthCount(title.length, CONSTANTS.TITLE_MAX_LENGTH)}
        <div className="border border-gray-400 hover:border-gray-600 focus-within:border-gray-600 p-2 w-fit rounded-full">
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setTopic(extractTopic(event.target.value))
            }
            className="outline-none cursor-pointer pr-1"
          >
            {CONSTANTS.TOPICS.map((topic: string, index: number) => (
              <option key={index}>
                {CONSTANTS.TOPIC_TO_EMOJI[topic]} {topic}
              </option>
            ))}
          </select>
        </div>
        <Divider />
        <textarea
          className="w-full h-64 outline-none border-b border-gray-400 focus:border-gray-600"
          placeholder="Your thoughts..."
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setBody(event.target.value)
          }
        ></textarea>
        {renderLengthCount(body.length, CONSTANTS.BODY_MAX_LENGTH)}
        <div className="mt-4 flex justify-end gap-4">
          <IconButton
            icon={faXmark}
            text="Cancel"
            color="red"
            callback={() => navigate('/')}
          />
          {renderPublishButton()}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default ArticleWrite
