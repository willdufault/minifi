const CONSTANTS: Record<string, any> = {
  TITLE_MAX_LENGTH: 50,
  BODY_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 50,
  REPLY_MAX_LENGTH: 50,
  REACTIONS: ['👍', '❤️', '🔥', '😂', '🐐'],
  TOPICS: ['AI', 'Software', 'Cloud', 'Cybersecurity', 'Other'],
  TOPIC_TO_EMOJI: {
    AI: '🧠',
    Software: '💻',
    Cloud: '☁️',
    Cybersecurity: '🔒',
    Other: '❓',
  },
  FEATURED_ARTICLE_IDS: [
    '686c5c572a1135ef5127e6fc',
    '686c5cdb12685a4e5b34a405',
    '686c5ce912685a4e5b34a406',
    '686c69e6749a8ea88649dc44',
    '686c69fe749a8ea88649dc45',
  ],
} as const

export default CONSTANTS
