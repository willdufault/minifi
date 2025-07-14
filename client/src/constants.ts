const CONSTANTS: Record<string, any> = {
  TITLE_MAX_LENGTH: 50,
  BODY_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 50,
  REPLY_MAX_LENGTH: 50,
  REACTIONS: ['👍', '❤️', '🔥', '😂', '🐐'],
  TOPICS: ['AI', 'Cloud', 'Cybersecurity', 'Software', 'Other'],
  TOPIC_TO_EMOJI: {
    AI: '🧠',
    Cloud: '☁️',
    Cybersecurity: '🔒',
    Software: '💻',
    Other: '❓',
  },
} as const

export default CONSTANTS
