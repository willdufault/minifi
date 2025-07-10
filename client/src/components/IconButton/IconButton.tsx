import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  icon: IconProp
  text: string
  color: string
  disabled?: boolean
  callback: () => void
}

function IconButton({ icon, text, color, disabled = false, callback }: Props) {
  // Need to explicitly write class names so Tailwind detects it.
  const colorToClasses: Record<string, string> = {
    blue: 'hover:border-blue-500 active:text-blue-500 active:border-blue-500',
    green:
      'hover:border-green-500 active:text-green-500 active:border-green-500',
    red: 'hover:border-red-500 active:text-red-500 active:border-red-500',
  }

  if (disabled) {
    return (
      <>
        <button
          className={`border border-gray-400 text-gray-400 rounded-full p-3 flex gap-2 justify-center items-center cursor-not-allowed`}
        >
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
          <span className="leading-none hidden sm:inline">{text}</span>
        </button>
      </>
    )
  }

  return (
    <>
      <button
        onClick={callback}
        className={`border border-gray-400 rounded-full p-3 flex gap-2 justify-center items-center cursor-pointer ${colorToClasses[color]}`}
      >
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        <span className="leading-none hidden sm:inline">{text}</span>
      </button>
    </>
  )
}

export default IconButton
