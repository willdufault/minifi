type Props = {
  emoji: string
  count: number
  callback: () => void
}

function EmojiButton({ emoji, count, callback }: Props) {
  return (
    <>
      <button
        onClick={callback}
        className="border rounded-full border-gray-400 hover:border-gray-600 active:border-gray-600 cursor-pointer px-2 py-1"
      >
        {emoji} {count}
      </button>
    </>
  )
}

export default EmojiButton
