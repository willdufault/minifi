import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  icon: IconProp
  text: string
  color: string
  callback: () => void
}

function IconButton({ icon, text, color, callback }: Props) {
  const colorToClasses: Record<string, string> = {
    blue: 'hover:border-blue-500 focus-within:text-blue-500 focus-within:border-blue-500',
  }

  return (
    <>
      <button
        onClick={callback}
        className={`border border-gray-400 rounded-full p-3 flex gap-2 justify-center items-center cursor-pointer ${colorToClasses[color]}`}
      >
        <FontAwesomeIcon icon={icon} />
        <span className="leading-none hidden sm:inline">{text}</span>
      </button>
    </>
  )
}

export default IconButton
